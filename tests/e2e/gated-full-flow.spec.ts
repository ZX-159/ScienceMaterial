import { test, expect } from "@playwright/test"

test.describe("Full Flow - Request -> Approve -> Access", () => {
  test("request access then approve then access locked lab", async ({ page }) => {
    // Reset mock to none for clean test
    await page.request.post("/api/access/reset")
    await page.request.get("/api/access/status") // ensure mock exists

    // Go to onboarding and request
    await page.goto("/onboarding/access", { waitUntil: "networkidle" })
    const choiceVisible = await page.getByText("Want full access").isVisible().catch(() => false)
    if (choiceVisible) {
      await page.getByRole("button", { name: /Request Full Access/ }).first().click()
      await page.waitForTimeout(800)
      await page.getByPlaceholder("012-3456789").fill("012-3456789")
      await page.getByRole("button", { name: /Send Request/ }).click()
      await page.waitForTimeout(1000)
      console.log("✓ Request sent")
    }

    // Check status should be pending
    const statusRes = await page.request.get("/api/access/status")
    const statusData = await statusRes.json()
    console.log(`Status after request: ${statusData.status}`)
    expect(["pending","approved"]).toContain(statusData.status)

    // Admin approve via API
    const adminUsersRes = await page.request.get("/api/admin/users")
    const adminData = await adminUsersRes.json()
    const testUser = adminData.users.find((u: any) => u.id === "test-user-1" || u.email.includes("test"))
    if (testUser) {
      const approveRes = await page.request.post("/api/admin/access/approve", {
        data: { userId: testUser.id, action: "approve" }
      })
      expect(approveRes.ok()).toBeTruthy()
      const approveData = await approveRes.json()
      console.log(`Approve result: ${approveData.status}`)
      expect(approveData.status).toBe("approved")
    }

    // Now check status should be approved
    const statusRes2 = await page.request.get("/api/access/status")
    const statusData2 = await statusRes2.json()
    console.log(`Status after approve: ${statusData2.status}, canAccessAll=${statusData2.canAccessAll}`)
    expect(statusData2.status).toBe("approved")
    expect(statusData2.canAccessAll).toBe(true)

    // Now try to access non-free lab - should be allowed
    const nonFree = "ohms-law"
    const htmlRes = await page.request.get(`/api/experiments/html?slug=${nonFree}`)
    console.log(`Non-free lab ${nonFree} after approve: ${htmlRes.status()}`)
    expect(htmlRes.ok()).toBeTruthy()
    const html = await htmlRes.text()
    expect(html.length).toBeGreaterThan(1000)

    // Check notification exists
    const notifRes = await page.request.get("/api/notifications")
    const notifData = await notifRes.json()
    console.log(`Notifications: ${notifData.notifications.length}, unread=${notifData.unreadCount}`)
    expect(notifData.notifications.length).toBeGreaterThan(0)
    const hasApprovedNotif = notifData.notifications.some((n: any) => n.type.includes("approved"))
    console.log(`Has approved notification: ${hasApprovedNotif}`)
    expect(hasApprovedNotif).toBe(true)

    // Test re-request cooldown: reject then try to re-request within 3 days should fail
    // First reject
    const rejectRes = await page.request.post("/api/admin/access/approve", {
      data: { userId: testUser.id, action: "reject", reason: "Test reject for cooldown check" }
    })
    expect(rejectRes.ok()).toBeTruthy()
    console.log("✓ Rejected for cooldown test")

    const statusRes3 = await page.request.get("/api/access/status")
    const statusData3 = await statusRes3.json()
    console.log(`Status after reject: ${statusData3.status}, canRequest=${statusData3.canRequest}, reason=${statusData3.canRequestReason}`)

    // Try to request again immediately - should fail with 3-day message
    const rerequestRes = await page.request.post("/api/access/request", {
      data: { phone: "012-3456789" }
    })
    console.log(`Rerequest immediate status: ${rerequestRes.status()}`)
    // Should be 400 with cooldown message
    expect(rerequestRes.status()).toBe(400)
    const rerequestData = await rerequestRes.json()
    console.log(`Rerequest error: ${rerequestData.error}`)
    expect(rerequestData.error).toContain("re-request after")

    // Reset to approved for future tests
    await page.request.post("/api/admin/access/approve", { data: { userId: testUser.id, action: "approve" } })
  })
})
