import { Book, Chapter, CurriculumMap } from "./types"

export const books: Book[] = [
  {
    "id": "book-1",
    "slug": "chu-yi-shang",
    "titleZh": "第一册·初一上册",
    "titleEn": "Junior 1 Upper",
    "subtitle": "科学是什么做的？到岩石与土壤",
    "year": "初一上",
    "chapterCount": 10,
    "description": "科学方法、实验室、测量、生物观察、细胞、物质与地球基础",
    "color": "mineral",
    "icon": "🔬"
  },
  {
    "id": "book-2",
    "slug": "chu-yi-xia",
    "titleZh": "第二册·初一下册",
    "titleEn": "Junior 1 Lower",
    "subtitle": "声音、光、运动、力、生殖与天体",
    "year": "初一下",
    "chapterCount": 11,
    "description": "声光与感官、运动与力、生物生殖、太阳系与地球运动",
    "color": "blueprint",
    "icon": "🌙"
  },
  {
    "id": "book-3",
    "slug": "chu-er-shang",
    "titleZh": "第三册·初二上册",
    "titleEn": "Junior 2 Upper",
    "subtitle": "水、植物、神经与电",
    "year": "初二上",
    "chapterCount": 11,
    "description": "水的性质、大气、植物生命、激素与神经、电学基础",
    "color": "teal",
    "icon": "💧"
  },
  {
    "id": "book-4",
    "slug": "chu-er-xia",
    "titleZh": "第四册·初二下册",
    "titleEn": "Junior 2 Lower",
    "subtitle": "粒子、空气、磁与家庭电路",
    "year": "初二下",
    "chapterCount": 11,
    "description": "粒子模型、元素、空气与氧、质量守恒、植物与土壤、磁与电",
    "color": "oxide",
    "icon": "🧲"
  },
  {
    "id": "book-5",
    "slug": "chu-san-shang",
    "titleZh": "第五册·初三上册",
    "titleEn": "Junior 3 Upper",
    "subtitle": "酸碱盐、金属、能量与人体",
    "year": "初三上",
    "chapterCount": 10,
    "description": "酸碱盐、金属、矿物、机械能、热与能量守恒、食物与消化循环",
    "color": "brass",
    "icon": "⚗️"
  },
  {
    "id": "book-6",
    "slug": "chu-san-xia",
    "titleZh": "第六册·初三下册",
    "titleEn": "Junior 3 Lower",
    "subtitle": "多样性、演化、宇宙与可持续",
    "year": "初三下",
    "chapterCount": 11,
    "description": "物种多样性、生命统一性、演化、星系宇宙、机械应用、电与波、资源与环境",
    "color": "mineral",
    "icon": "🌌"
  }
]

export const chapters: Chapter[] = [
  {
    "id": "b1-c1",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 1,
    "titleZh": "科学测量",
    "slug": "ke-xue-ce-liang",
    "estimatedMinutes": 45,
    "isReconstructed": true,
    "reconstructedNote": "完整科学测量 strand"
  },
  {
    "id": "b1-c2",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 2,
    "titleZh": "走进科学实验室",
    "slug": "zou-jin-ke-xue-shi-yan-shi",
    "estimatedMinutes": 15
  },
  {
    "id": "b1-c3",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 3,
    "titleZh": "测量",
    "slug": "ce-liang",
    "estimatedMinutes": 20,
    "isReconstructed": true,
    "reconstructedNote": "原笔记与课本都没有把本章列为独立的章，测量内容写在第二章之后；本项目按课纲单独成章。"
  },
  {
    "id": "b1-c4",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 4,
    "titleZh": "观察生物",
    "slug": "guan-cha-sheng-wu",
    "estimatedMinutes": 18
  },
  {
    "id": "b1-c5",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 5,
    "titleZh": "细胞和生物体",
    "slug": "xi-bao-he-sheng-wu-ti",
    "estimatedMinutes": 20
  },
  {
    "id": "b1-c6",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 6,
    "titleZh": "多细胞生物体的构造",
    "slug": "duo-xi-bao-sheng-wu-ti-de-gou-zao",
    "estimatedMinutes": 16
  },
  {
    "id": "b1-c7",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 7,
    "titleZh": "认识物质",
    "slug": "ren-shi-wu-zhi",
    "estimatedMinutes": 18
  },
  {
    "id": "b1-c8",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 8,
    "titleZh": "物质常见的性质",
    "slug": "wu-zhi-chang-jian-de-xing-zhi",
    "estimatedMinutes": 22
  },
  {
    "id": "b1-c9",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 9,
    "titleZh": "地球概况",
    "slug": "di-qiu-gai-kuang",
    "estimatedMinutes": 20
  },
  {
    "id": "b1-c10",
    "bookId": "book-1",
    "bookSlug": "chu-yi-shang",
    "number": 10,
    "titleZh": "岩石与土壤",
    "slug": "yan-shi-yu-tu-rang",
    "estimatedMinutes": 15,
    "isReconstructed": true,
    "reconstructedNote": "课本并入第九章末段，本项目恢复为独立第十章。"
  },
  {
    "id": "b2-c1",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 1,
    "titleZh": "声音和耳",
    "slug": "sheng-yin-he-er",
    "estimatedMinutes": 18
  },
  {
    "id": "b2-c2",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 2,
    "titleZh": "光和眼",
    "slug": "guang-he-yan",
    "estimatedMinutes": 22
  },
  {
    "id": "b2-c3",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 3,
    "titleZh": "人对信息的获取和处理",
    "slug": "ren-dui-xin-xi-de-huo-qu-he-chu-li",
    "estimatedMinutes": 15
  },
  {
    "id": "b2-c4",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 4,
    "titleZh": "自然界中的运动",
    "slug": "zi-ran-jie-zhong-de-yun-dong",
    "estimatedMinutes": 20
  },
  {
    "id": "b2-c5",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 5,
    "titleZh": "力和压强",
    "slug": "li-he-ya-qiang",
    "estimatedMinutes": 18
  },
  {
    "id": "b2-c6",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 6,
    "titleZh": "平衡与稳度",
    "slug": "ping-heng-yu-wen-du",
    "estimatedMinutes": 14
  },
  {
    "id": "b2-c7",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 7,
    "titleZh": "生物的生殖",
    "slug": "sheng-wu-de-sheng-zhi",
    "estimatedMinutes": 16
  },
  {
    "id": "b2-c8",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 8,
    "titleZh": "人类的生殖和发育",
    "slug": "ren-lei-de-sheng-zhi-he-fa-yu",
    "estimatedMinutes": 18
  },
  {
    "id": "b2-c9",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 9,
    "titleZh": "太阳和太阳系",
    "slug": "tai-yang-he-tai-yang-xi",
    "estimatedMinutes": 16
  },
  {
    "id": "b2-c10",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 10,
    "titleZh": "地球和月球",
    "slug": "di-qiu-he-yue-qiu",
    "estimatedMinutes": 15
  },
  {
    "id": "b2-c11",
    "bookId": "book-2",
    "bookSlug": "chu-yi-xia",
    "number": 11,
    "titleZh": "地球的自转和公转",
    "slug": "di-qiu-de-zi-zhuan-he-gong-zhuan",
    "estimatedMinutes": 15
  },
  {
    "id": "b3-c1",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 1,
    "titleZh": "生活中的水",
    "slug": "sheng-huo-zhong-de-shui",
    "estimatedMinutes": 18
  },
  {
    "id": "b3-c2",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 2,
    "titleZh": "水的密度和压强",
    "slug": "shui-de-mi-du-he-ya-qiang",
    "estimatedMinutes": 20
  },
  {
    "id": "b3-c3",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 3,
    "titleZh": "水的溶解性",
    "slug": "shui-de-rong-jie-xing",
    "estimatedMinutes": 16
  },
  {
    "id": "b3-c4",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 4,
    "titleZh": "大气压力",
    "slug": "da-qi-ya-li",
    "estimatedMinutes": 15
  },
  {
    "id": "b3-c5",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 5,
    "titleZh": "大气层的污染和保护",
    "slug": "da-qi-ceng-de-wu-ran-he-bao-hu",
    "estimatedMinutes": 14
  },
  {
    "id": "b3-c6",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 6,
    "titleZh": "植物的一生",
    "slug": "zhi-wu-de-yi-sheng",
    "estimatedMinutes": 18
  },
  {
    "id": "b3-c7",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 7,
    "titleZh": "人体的激素调节",
    "slug": "ren-ti-de-ji-su-tiao-jie",
    "estimatedMinutes": 16
  },
  {
    "id": "b3-c8",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 8,
    "titleZh": "人体的神经调节",
    "slug": "ren-ti-de-shen-jing-tiao-jie",
    "estimatedMinutes": 18
  },
  {
    "id": "b3-c9",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 9,
    "titleZh": "静电",
    "slug": "jing-dian",
    "estimatedMinutes": 15
  },
  {
    "id": "b3-c10",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 10,
    "titleZh": "电路",
    "slug": "dian-lu",
    "estimatedMinutes": 18
  },
  {
    "id": "b3-c11",
    "bookId": "book-3",
    "bookSlug": "chu-er-shang",
    "number": 11,
    "titleZh": "电流、电阻和电压",
    "slug": "dian-liu-dian-zu-he-dian-ya",
    "estimatedMinutes": 20
  },
  {
    "id": "b4-c1",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 1,
    "titleZh": "粒子的模型",
    "slug": "li-zi-de-mo-xing",
    "estimatedMinutes": 16
  },
  {
    "id": "b4-c2",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 2,
    "titleZh": "元素与元素符号",
    "slug": "yuan-su-yu-yuan-su-fu-hao",
    "estimatedMinutes": 15
  },
  {
    "id": "b4-c3",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 3,
    "titleZh": "物质的组成和化学式",
    "slug": "wu-zhi-de-zu-cheng-he-hua-xue-shi",
    "estimatedMinutes": 18
  },
  {
    "id": "b4-c4",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 4,
    "titleZh": "空气",
    "slug": "kong-qi",
    "estimatedMinutes": 14
  },
  {
    "id": "b4-c5",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 5,
    "titleZh": "氧气和二氧化碳",
    "slug": "yang-qi-he-er-yang-hua-tan",
    "estimatedMinutes": 16
  },
  {
    "id": "b4-c6",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 6,
    "titleZh": "质量守恒定律",
    "slug": "zhi-liang-shou-heng-ding-lv",
    "estimatedMinutes": 14
  },
  {
    "id": "b4-c7",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 7,
    "titleZh": "生物中的氧和二氧化碳的循环",
    "slug": "sheng-wu-zhong-de-yang-he-er-yang-hua-tan-de-xun-huan",
    "estimatedMinutes": 15
  },
  {
    "id": "b4-c8",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 8,
    "titleZh": "植物与土壤",
    "slug": "zhi-wu-yu-tu-rang",
    "estimatedMinutes": 16
  },
  {
    "id": "b4-c9",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 9,
    "titleZh": "指南针为什么能指南北",
    "slug": "zhi-nan-zhen-wei-shen-me-neng-zhi-nan-bei",
    "estimatedMinutes": 14
  },
  {
    "id": "b4-c10",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 10,
    "titleZh": "电生磁和磁生电",
    "slug": "dian-sheng-ci-he-ci-sheng-dian",
    "estimatedMinutes": 18
  },
  {
    "id": "b4-c11",
    "bookId": "book-4",
    "bookSlug": "chu-er-xia",
    "number": 11,
    "titleZh": "家庭电路",
    "slug": "jia-ting-dian-lu",
    "estimatedMinutes": 16
  },
  {
    "id": "b5-c1",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 1,
    "titleZh": "酸和氢气",
    "slug": "suan-he-qing-qi",
    "estimatedMinutes": 18
  },
  {
    "id": "b5-c2",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 2,
    "titleZh": "碱和盐",
    "slug": "jian-he-yan",
    "estimatedMinutes": 18
  },
  {
    "id": "b5-c3",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 3,
    "titleZh": "金属与非金属",
    "slug": "jin-shu-yu-fei-jin-shu",
    "estimatedMinutes": 16
  },
  {
    "id": "b5-c4",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 4,
    "titleZh": "地球矿物资源的开发和利用",
    "slug": "di-qiu-kuang-wu-zi-yuan-de-kai-fa-he-li-yong",
    "estimatedMinutes": 16
  },
  {
    "id": "b5-c5",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 5,
    "titleZh": "机械能",
    "slug": "ji-xie-neng",
    "estimatedMinutes": 18
  },
  {
    "id": "b5-c6",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 6,
    "titleZh": "热",
    "slug": "re",
    "estimatedMinutes": 16
  },
  {
    "id": "b5-c7",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 7,
    "titleZh": "能量的转化与守恒",
    "slug": "neng-liang-de-zhuan-hua-yu-shou-heng",
    "estimatedMinutes": 18
  },
  {
    "id": "b5-c8",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 8,
    "titleZh": "食物与营养",
    "slug": "shi-wu-yu-ying-yang",
    "estimatedMinutes": 20
  },
  {
    "id": "b5-c9",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 9,
    "titleZh": "人体消化系统的结构",
    "slug": "ren-ti-xiao-hua-xi-tong-de-jie-gou",
    "estimatedMinutes": 18
  },
  {
    "id": "b5-c10",
    "bookId": "book-5",
    "bookSlug": "chu-san-shang",
    "number": 10,
    "titleZh": "物质的运输和排泄",
    "slug": "wu-zhi-de-yun-shu-he-pai-xie",
    "estimatedMinutes": 20
  },
  {
    "id": "b6-c1",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 1,
    "titleZh": "物种的多样性",
    "slug": "wu-zhong-de-duo-yang-xing",
    "estimatedMinutes": 16
  },
  {
    "id": "b6-c2",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 2,
    "titleZh": "生命的统一性",
    "slug": "sheng-ming-de-tong-yi-xing",
    "estimatedMinutes": 16
  },
  {
    "id": "b6-c3",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 3,
    "titleZh": "生物的演化",
    "slug": "sheng-wu-de-yan-hua",
    "estimatedMinutes": 18
  },
  {
    "id": "b6-c4",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 4,
    "titleZh": "星和星系",
    "slug": "xing-he-xing-xi",
    "estimatedMinutes": 15
  },
  {
    "id": "b6-c5",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 5,
    "titleZh": "宇宙探秘",
    "slug": "yu-zhou-tan-mi",
    "estimatedMinutes": 15
  },
  {
    "id": "b6-c6",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 6,
    "titleZh": "简单机械的应用",
    "slug": "jian-dan-ji-xie-de-ying-yong",
    "estimatedMinutes": 18
  },
  {
    "id": "b6-c7",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 7,
    "titleZh": "电的应用",
    "slug": "dian-de-ying-yong",
    "estimatedMinutes": 20
  },
  {
    "id": "b6-c8",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 8,
    "titleZh": "波和信息",
    "slug": "bo-he-xin-xi",
    "estimatedMinutes": 18
  },
  {
    "id": "b6-c9",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 9,
    "titleZh": "地球资源的可持续利用",
    "slug": "di-qiu-zi-yuan-de-ke-chi-xu-li-yong",
    "estimatedMinutes": 16
  },
  {
    "id": "b6-c10",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 10,
    "titleZh": "能源的可持续利用",
    "slug": "neng-yuan-de-ke-chi-xu-li-yong",
    "estimatedMinutes": 16
  },
  {
    "id": "b6-c11",
    "bookId": "book-6",
    "bookSlug": "chu-san-xia",
    "number": 11,
    "titleZh": "环境的可持续发展",
    "slug": "huan-jing-de-ke-chi-xu-fa-zhan",
    "estimatedMinutes": 18
  }
]

export const curriculum: CurriculumMap = { books, chapters }

export function getBookBySlug(slug: string) { return books.find(b => b.slug === slug) }
export function getChapterBySlug(bookSlug: string, chapterSlug: string) { return chapters.find(c => c.bookSlug === bookSlug && c.slug === chapterSlug) }
export function getChaptersByBook(bookSlug: string) { return chapters.filter(c => c.bookSlug === bookSlug).sort((a,b)=>a.number-b.number) }

export const sampleChapterContent: Record<string, any> = {
  "ke-xue-ce-liang": {
    "title": "科学测量",
    "sections": [
      {
        "id": "s1",
        "titleZh": "科学测量 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "科学测量是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "科学测量",
            "definition": "本章围绕科学测量的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦科学测量的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "科学测量要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "科学测量要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾科学测量的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c1-q1"
          }
        ]
      }
    ]
  },
  "zou-jin-ke-xue-shi-yan-shi": {
    "title": "走进科学实验室",
    "sections": [
      {
        "id": "s1",
        "titleZh": "走进科学实验室 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "走进科学实验室是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "走进科学实验室",
            "definition": "本章围绕走进科学实验室的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦走进科学实验室的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "走进科学实验室要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "走进科学实验室要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾走进科学实验室的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c2-q1"
          }
        ]
      }
    ]
  },
  "ce-liang": {
    "title": "测量",
    "sections": [
      {
        "id": "s1",
        "titleZh": "测量 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "测量是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "测量",
            "definition": "本章围绕测量的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦测量的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "测量要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "测量要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾测量的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c3-q1"
          }
        ]
      }
    ]
  },
  "guan-cha-sheng-wu": {
    "title": "观察生物",
    "sections": [
      {
        "id": "s1",
        "titleZh": "观察生物 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "观察生物是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "观察生物",
            "definition": "本章围绕观察生物的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦观察生物的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "观察生物要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "观察生物要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾观察生物的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c4-q1"
          }
        ]
      }
    ]
  },
  "xi-bao-he-sheng-wu-ti": {
    "title": "细胞和生物体",
    "sections": [
      {
        "id": "s1",
        "titleZh": "细胞和生物体 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "细胞和生物体是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "细胞和生物体",
            "definition": "本章围绕细胞和生物体的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦细胞和生物体的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "细胞和生物体要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "细胞和生物体要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾细胞和生物体的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c5-q1"
          }
        ]
      }
    ]
  },
  "duo-xi-bao-sheng-wu-ti-de-gou-zao": {
    "title": "多细胞生物体的构造",
    "sections": [
      {
        "id": "s1",
        "titleZh": "多细胞生物体的构造 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "多细胞生物体的构造是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "多细胞生物体的构造",
            "definition": "本章围绕多细胞生物体的构造的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦多细胞生物体的构造的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "多细胞生物体的构造要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "多细胞生物体的构造要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾多细胞生物体的构造的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c6-q1"
          }
        ]
      }
    ]
  },
  "ren-shi-wu-zhi": {
    "title": "认识物质",
    "sections": [
      {
        "id": "s1",
        "titleZh": "认识物质 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "认识物质是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "认识物质",
            "definition": "本章围绕认识物质的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦认识物质的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "认识物质要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "认识物质要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾认识物质的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c7-q1"
          }
        ]
      }
    ]
  },
  "wu-zhi-chang-jian-de-xing-zhi": {
    "title": "物质常见的性质",
    "sections": [
      {
        "id": "s1",
        "titleZh": "物质常见的性质 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "物质常见的性质是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "物质常见的性质",
            "definition": "本章围绕物质常见的性质的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦物质常见的性质的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "物质常见的性质要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "物质常见的性质要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾物质常见的性质的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c8-q1"
          }
        ]
      }
    ]
  },
  "di-qiu-gai-kuang": {
    "title": "地球概况",
    "sections": [
      {
        "id": "s1",
        "titleZh": "地球概况 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "地球概况是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "地球概况",
            "definition": "本章围绕地球概况的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦地球概况的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "地球概况要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "地球概况要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾地球概况的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c9-q1"
          }
        ]
      }
    ]
  },
  "yan-shi-yu-tu-rang": {
    "title": "岩石与土壤",
    "sections": [
      {
        "id": "s1",
        "titleZh": "岩石与土壤 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "岩石与土壤是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "岩石与土壤",
            "definition": "本章围绕岩石与土壤的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦岩石与土壤的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "岩石与土壤要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "岩石与土壤要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾岩石与土壤的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b1-c10-q1"
          }
        ]
      }
    ]
  },
  "sheng-yin-he-er": {
    "title": "声音和耳",
    "sections": [
      {
        "id": "s1",
        "titleZh": "声音和耳 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "声音和耳是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "声音和耳",
            "definition": "本章围绕声音和耳的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦声音和耳的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "声音和耳要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "声音和耳要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾声音和耳的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c1-q1"
          }
        ]
      }
    ]
  },
  "guang-he-yan": {
    "title": "光和眼",
    "sections": [
      {
        "id": "s1",
        "titleZh": "光和眼 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "光和眼是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "光和眼",
            "definition": "本章围绕光和眼的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦光和眼的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "光和眼要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "光和眼要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾光和眼的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c2-q1"
          }
        ]
      }
    ]
  },
  "ren-dui-xin-xi-de-huo-qu-he-chu-li": {
    "title": "人对信息的获取和处理",
    "sections": [
      {
        "id": "s1",
        "titleZh": "人对信息的获取和处理 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "人对信息的获取和处理是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "人对信息的获取和处理",
            "definition": "本章围绕人对信息的获取和处理的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦人对信息的获取和处理的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "人对信息的获取和处理要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "人对信息的获取和处理要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾人对信息的获取和处理的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c3-q1"
          }
        ]
      }
    ]
  },
  "zi-ran-jie-zhong-de-yun-dong": {
    "title": "自然界中的运动",
    "sections": [
      {
        "id": "s1",
        "titleZh": "自然界中的运动 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "自然界中的运动是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "自然界中的运动",
            "definition": "本章围绕自然界中的运动的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦自然界中的运动的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "自然界中的运动要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "自然界中的运动要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾自然界中的运动的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c4-q1"
          }
        ]
      }
    ]
  },
  "li-he-ya-qiang": {
    "title": "力和压强",
    "sections": [
      {
        "id": "s1",
        "titleZh": "力和压强 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "力和压强是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "力和压强",
            "definition": "本章围绕力和压强的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦力和压强的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "力和压强要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "力和压强要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾力和压强的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c5-q1"
          }
        ]
      }
    ]
  },
  "ping-heng-yu-wen-du": {
    "title": "平衡与稳度",
    "sections": [
      {
        "id": "s1",
        "titleZh": "平衡与稳度 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "平衡与稳度是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "平衡与稳度",
            "definition": "本章围绕平衡与稳度的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦平衡与稳度的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "平衡与稳度要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "平衡与稳度要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾平衡与稳度的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c6-q1"
          }
        ]
      }
    ]
  },
  "sheng-wu-de-sheng-zhi": {
    "title": "生物的生殖",
    "sections": [
      {
        "id": "s1",
        "titleZh": "生物的生殖 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "生物的生殖是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "生物的生殖",
            "definition": "本章围绕生物的生殖的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦生物的生殖的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "生物的生殖要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "生物的生殖要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾生物的生殖的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c7-q1"
          }
        ]
      }
    ]
  },
  "ren-lei-de-sheng-zhi-he-fa-yu": {
    "title": "人类的生殖和发育",
    "sections": [
      {
        "id": "s1",
        "titleZh": "人类的生殖和发育 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "人类的生殖和发育是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "人类的生殖和发育",
            "definition": "本章围绕人类的生殖和发育的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦人类的生殖和发育的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "人类的生殖和发育要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "人类的生殖和发育要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾人类的生殖和发育的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c8-q1"
          }
        ]
      }
    ]
  },
  "tai-yang-he-tai-yang-xi": {
    "title": "太阳和太阳系",
    "sections": [
      {
        "id": "s1",
        "titleZh": "太阳和太阳系 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "太阳和太阳系是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "太阳和太阳系",
            "definition": "本章围绕太阳和太阳系的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦太阳和太阳系的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "太阳和太阳系要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "太阳和太阳系要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾太阳和太阳系的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c9-q1"
          }
        ]
      }
    ]
  },
  "di-qiu-he-yue-qiu": {
    "title": "地球和月球",
    "sections": [
      {
        "id": "s1",
        "titleZh": "地球和月球 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "地球和月球是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "地球和月球",
            "definition": "本章围绕地球和月球的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦地球和月球的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "地球和月球要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "地球和月球要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾地球和月球的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c10-q1"
          }
        ]
      }
    ]
  },
  "di-qiu-de-zi-zhuan-he-gong-zhuan": {
    "title": "地球的自转和公转",
    "sections": [
      {
        "id": "s1",
        "titleZh": "地球的自转和公转 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "地球的自转和公转是初中科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "地球的自转和公转",
            "definition": "本章围绕地球的自转和公转的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦地球的自转和公转的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "地球的自转和公转要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "地球的自转和公转要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾地球的自转和公转的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b2-c11-q1"
          }
        ]
      }
    ]
  },
  "sheng-huo-zhong-de-shui": {
    "title": "生活中的水",
    "sections": [
      {
        "id": "s1",
        "titleZh": "生活中的水 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "生活中的水是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "生活中的水",
            "definition": "本章围绕生活中的水的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦生活中的水的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "生活中的水要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "生活中的水要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾生活中的水的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c1-q1"
          }
        ]
      }
    ]
  },
  "shui-de-mi-du-he-ya-qiang": {
    "title": "水的密度和压强",
    "sections": [
      {
        "id": "s1",
        "titleZh": "水的密度和压强 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "水的密度和压强是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "水的密度和压强",
            "definition": "本章围绕水的密度和压强的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦水的密度和压强的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "水的密度和压强要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "水的密度和压强要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾水的密度和压强的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c2-q1"
          }
        ]
      }
    ]
  },
  "shui-de-rong-jie-xing": {
    "title": "水的溶解性",
    "sections": [
      {
        "id": "s1",
        "titleZh": "水的溶解性 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "水的溶解性是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "水的溶解性",
            "definition": "本章围绕水的溶解性的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦水的溶解性的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "水的溶解性要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "水的溶解性要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾水的溶解性的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c3-q1"
          }
        ]
      }
    ]
  },
  "da-qi-ya-li": {
    "title": "大气压力",
    "sections": [
      {
        "id": "s1",
        "titleZh": "大气压力 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "大气压力是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "大气压力",
            "definition": "本章围绕大气压力的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦大气压力的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "大气压力要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "大气压力要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾大气压力的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c4-q1"
          }
        ]
      }
    ]
  },
  "da-qi-ceng-de-wu-ran-he-bao-hu": {
    "title": "大气层的污染和保护",
    "sections": [
      {
        "id": "s1",
        "titleZh": "大气层的污染和保护 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "大气层的污染和保护是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "大气层的污染和保护",
            "definition": "本章围绕大气层的污染和保护的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦大气层的污染和保护的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "大气层的污染和保护要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "大气层的污染和保护要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾大气层的污染和保护的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c5-q1"
          }
        ]
      }
    ]
  },
  "zhi-wu-de-yi-sheng": {
    "title": "植物的一生",
    "sections": [
      {
        "id": "s1",
        "titleZh": "植物的一生 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "植物的一生是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "植物的一生",
            "definition": "本章围绕植物的一生的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦植物的一生的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "植物的一生要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "植物的一生要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾植物的一生的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c6-q1"
          }
        ]
      }
    ]
  },
  "ren-ti-de-ji-su-tiao-jie": {
    "title": "人体的激素调节",
    "sections": [
      {
        "id": "s1",
        "titleZh": "人体的激素调节 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "人体的激素调节是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "人体的激素调节",
            "definition": "本章围绕人体的激素调节的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦人体的激素调节的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "人体的激素调节要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "人体的激素调节要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾人体的激素调节的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c7-q1"
          }
        ]
      }
    ]
  },
  "ren-ti-de-shen-jing-tiao-jie": {
    "title": "人体的神经调节",
    "sections": [
      {
        "id": "s1",
        "titleZh": "人体的神经调节 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "人体的神经调节是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "人体的神经调节",
            "definition": "本章围绕人体的神经调节的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦人体的神经调节的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "人体的神经调节要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "人体的神经调节要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾人体的神经调节的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c8-q1"
          }
        ]
      }
    ]
  },
  "jing-dian": {
    "title": "静电",
    "sections": [
      {
        "id": "s1",
        "titleZh": "静电 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "静电是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "静电",
            "definition": "本章围绕静电的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦静电的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "静电要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "静电要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾静电的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c9-q1"
          }
        ]
      }
    ]
  },
  "dian-lu": {
    "title": "电路",
    "sections": [
      {
        "id": "s1",
        "titleZh": "电路 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "电路是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "电路",
            "definition": "本章围绕电路的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦电路的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "电路要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "电路要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾电路的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c10-q1"
          }
        ]
      }
    ]
  },
  "dian-liu-dian-zu-he-dian-ya": {
    "title": "电流、电阻和电压",
    "sections": [
      {
        "id": "s1",
        "titleZh": "电流、电阻和电压 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "电流、电阻和电压是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "电流、电阻和电压",
            "definition": "本章围绕电流、电阻和电压的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦电流、电阻和电压的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "电流、电阻和电压要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "电流、电阻和电压要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾电流、电阻和电压的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b3-c11-q1"
          }
        ]
      }
    ]
  },
  "li-zi-de-mo-xing": {
    "title": "粒子的模型",
    "sections": [
      {
        "id": "s1",
        "titleZh": "粒子的模型 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "粒子的模型是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "粒子的模型",
            "definition": "本章围绕粒子的模型的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦粒子的模型的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "粒子的模型要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "粒子的模型要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾粒子的模型的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c1-q1"
          }
        ]
      }
    ]
  },
  "yuan-su-yu-yuan-su-fu-hao": {
    "title": "元素与元素符号",
    "sections": [
      {
        "id": "s1",
        "titleZh": "元素与元素符号 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "元素与元素符号是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "元素与元素符号",
            "definition": "本章围绕元素与元素符号的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦元素与元素符号的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "元素与元素符号要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "元素与元素符号要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾元素与元素符号的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c2-q1"
          }
        ]
      }
    ]
  },
  "wu-zhi-de-zu-cheng-he-hua-xue-shi": {
    "title": "物质的组成和化学式",
    "sections": [
      {
        "id": "s1",
        "titleZh": "物质的组成和化学式 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "物质的组成和化学式是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "物质的组成和化学式",
            "definition": "本章围绕物质的组成和化学式的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦物质的组成和化学式的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "物质的组成和化学式要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "物质的组成和化学式要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾物质的组成和化学式的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c3-q1"
          }
        ]
      }
    ]
  },
  "kong-qi": {
    "title": "空气",
    "sections": [
      {
        "id": "s1",
        "titleZh": "空气 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "空气是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "空气",
            "definition": "本章围绕空气的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦空气的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "空气要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "空气要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾空气的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c4-q1"
          }
        ]
      }
    ]
  },
  "yang-qi-he-er-yang-hua-tan": {
    "title": "氧气和二氧化碳",
    "sections": [
      {
        "id": "s1",
        "titleZh": "氧气和二氧化碳 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "氧气和二氧化碳是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "氧气和二氧化碳",
            "definition": "本章围绕氧气和二氧化碳的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦氧气和二氧化碳的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "氧气和二氧化碳要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "氧气和二氧化碳要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾氧气和二氧化碳的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c5-q1"
          }
        ]
      }
    ]
  },
  "zhi-liang-shou-heng-ding-lv": {
    "title": "质量守恒定律",
    "sections": [
      {
        "id": "s1",
        "titleZh": "质量守恒定律 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "质量守恒定律是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "质量守恒定律",
            "definition": "本章围绕质量守恒定律的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦质量守恒定律的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "质量守恒定律要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "质量守恒定律要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾质量守恒定律的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c6-q1"
          }
        ]
      }
    ]
  },
  "sheng-wu-zhong-de-yang-he-er-yang-hua-tan-de-xun-huan": {
    "title": "生物中的氧和二氧化碳的循环",
    "sections": [
      {
        "id": "s1",
        "titleZh": "生物中的氧和二氧化碳的循环 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "生物中的氧和二氧化碳的循环是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "生物中的氧和二氧化碳的循环",
            "definition": "本章围绕生物中的氧和二氧化碳的循环的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦生物中的氧和二氧化碳的循环的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "生物中的氧和二氧化碳的循环要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "生物中的氧和二氧化碳的循环要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾生物中的氧和二氧化碳的循环的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c7-q1"
          }
        ]
      }
    ]
  },
  "zhi-wu-yu-tu-rang": {
    "title": "植物与土壤",
    "sections": [
      {
        "id": "s1",
        "titleZh": "植物与土壤 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "植物与土壤是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "植物与土壤",
            "definition": "本章围绕植物与土壤的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦植物与土壤的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "植物与土壤要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "植物与土壤要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾植物与土壤的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c8-q1"
          }
        ]
      }
    ]
  },
  "zhi-nan-zhen-wei-shen-me-neng-zhi-nan-bei": {
    "title": "指南针为什么能指南北",
    "sections": [
      {
        "id": "s1",
        "titleZh": "指南针为什么能指南北 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "指南针为什么能指南北是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "指南针为什么能指南北",
            "definition": "本章围绕指南针为什么能指南北的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦指南针为什么能指南北的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "指南针为什么能指南北要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "指南针为什么能指南北要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾指南针为什么能指南北的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c9-q1"
          }
        ]
      }
    ]
  },
  "dian-sheng-ci-he-ci-sheng-dian": {
    "title": "电生磁和磁生电",
    "sections": [
      {
        "id": "s1",
        "titleZh": "电生磁和磁生电 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "电生磁和磁生电是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "电生磁和磁生电",
            "definition": "本章围绕电生磁和磁生电的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦电生磁和磁生电的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "电生磁和磁生电要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "电生磁和磁生电要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾电生磁和磁生电的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c10-q1"
          }
        ]
      }
    ]
  },
  "jia-ting-dian-lu": {
    "title": "家庭电路",
    "sections": [
      {
        "id": "s1",
        "titleZh": "家庭电路 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "家庭电路是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "家庭电路",
            "definition": "本章围绕家庭电路的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦家庭电路的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "家庭电路要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "家庭电路要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾家庭电路的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b4-c11-q1"
          }
        ]
      }
    ]
  },
  "suan-he-qing-qi": {
    "title": "酸和氢气",
    "sections": [
      {
        "id": "s1",
        "titleZh": "酸和氢气 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "酸和氢气是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "酸和氢气",
            "definition": "本章围绕酸和氢气的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦酸和氢气的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "酸和氢气要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "酸和氢气要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾酸和氢气的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c1-q1"
          }
        ]
      }
    ]
  },
  "jian-he-yan": {
    "title": "碱和盐",
    "sections": [
      {
        "id": "s1",
        "titleZh": "碱和盐 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "碱和盐是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "碱和盐",
            "definition": "本章围绕碱和盐的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦碱和盐的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "碱和盐要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "碱和盐要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾碱和盐的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c2-q1"
          }
        ]
      }
    ]
  },
  "jin-shu-yu-fei-jin-shu": {
    "title": "金属与非金属",
    "sections": [
      {
        "id": "s1",
        "titleZh": "金属与非金属 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "金属与非金属是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "金属与非金属",
            "definition": "本章围绕金属与非金属的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦金属与非金属的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "金属与非金属要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "金属与非金属要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾金属与非金属的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c3-q1"
          }
        ]
      }
    ]
  },
  "di-qiu-kuang-wu-zi-yuan-de-kai-fa-he-li-yong": {
    "title": "地球矿物资源的开发和利用",
    "sections": [
      {
        "id": "s1",
        "titleZh": "地球矿物资源的开发和利用 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "地球矿物资源的开发和利用是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "地球矿物资源的开发和利用",
            "definition": "本章围绕地球矿物资源的开发和利用的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦地球矿物资源的开发和利用的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "地球矿物资源的开发和利用要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "地球矿物资源的开发和利用要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾地球矿物资源的开发和利用的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c4-q1"
          }
        ]
      }
    ]
  },
  "ji-xie-neng": {
    "title": "机械能",
    "sections": [
      {
        "id": "s1",
        "titleZh": "机械能 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "机械能是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "机械能",
            "definition": "本章围绕机械能的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦机械能的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "机械能要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "机械能要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾机械能的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c5-q1"
          }
        ]
      }
    ]
  },
  "re": {
    "title": "热",
    "sections": [
      {
        "id": "s1",
        "titleZh": "热 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "热是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "热",
            "definition": "本章围绕热的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦热的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "热要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "热要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾热的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c6-q1"
          }
        ]
      }
    ]
  },
  "neng-liang-de-zhuan-hua-yu-shou-heng": {
    "title": "能量的转化与守恒",
    "sections": [
      {
        "id": "s1",
        "titleZh": "能量的转化与守恒 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "能量的转化与守恒是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "能量的转化与守恒",
            "definition": "本章围绕能量的转化与守恒的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦能量的转化与守恒的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "能量的转化与守恒要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "能量的转化与守恒要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾能量的转化与守恒的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c7-q1"
          }
        ]
      }
    ]
  },
  "shi-wu-yu-ying-yang": {
    "title": "食物与营养",
    "sections": [
      {
        "id": "s1",
        "titleZh": "食物与营养 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "食物与营养是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "食物与营养",
            "definition": "本章围绕食物与营养的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦食物与营养的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "食物与营养要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "食物与营养要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾食物与营养的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c8-q1"
          }
        ]
      }
    ]
  },
  "ren-ti-xiao-hua-xi-tong-de-jie-gou": {
    "title": "人体消化系统的结构",
    "sections": [
      {
        "id": "s1",
        "titleZh": "人体消化系统的结构 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "人体消化系统的结构是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "人体消化系统的结构",
            "definition": "本章围绕人体消化系统的结构的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦人体消化系统的结构的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "人体消化系统的结构要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "人体消化系统的结构要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾人体消化系统的结构的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c9-q1"
          }
        ]
      }
    ]
  },
  "wu-zhi-de-yun-shu-he-pai-xie": {
    "title": "物质的运输和排泄",
    "sections": [
      {
        "id": "s1",
        "titleZh": "物质的运输和排泄 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "物质的运输和排泄是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "物质的运输和排泄",
            "definition": "本章围绕物质的运输和排泄的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦物质的运输和排泄的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "物质的运输和排泄要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "物质的运输和排泄要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾物质的运输和排泄的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b5-c10-q1"
          }
        ]
      }
    ]
  },
  "wu-zhong-de-duo-yang-xing": {
    "title": "物种的多样性",
    "sections": [
      {
        "id": "s1",
        "titleZh": "物种的多样性 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "物种的多样性是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "物种的多样性",
            "definition": "本章围绕物种的多样性的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦物种的多样性的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "物种的多样性要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "物种的多样性要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾物种的多样性的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c1-q1"
          }
        ]
      }
    ]
  },
  "sheng-ming-de-tong-yi-xing": {
    "title": "生命的统一性",
    "sections": [
      {
        "id": "s1",
        "titleZh": "生命的统一性 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "生命的统一性是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "生命的统一性",
            "definition": "本章围绕生命的统一性的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦生命的统一性的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "生命的统一性要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "生命的统一性要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾生命的统一性的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c2-q1"
          }
        ]
      }
    ]
  },
  "sheng-wu-de-yan-hua": {
    "title": "生物的演化",
    "sections": [
      {
        "id": "s1",
        "titleZh": "生物的演化 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "生物的演化是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "生物的演化",
            "definition": "本章围绕生物的演化的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦生物的演化的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "生物的演化要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "生物的演化要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾生物的演化的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c3-q1"
          }
        ]
      }
    ]
  },
  "xing-he-xing-xi": {
    "title": "星和星系",
    "sections": [
      {
        "id": "s1",
        "titleZh": "星和星系 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "星和星系是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "星和星系",
            "definition": "本章围绕星和星系的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦星和星系的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "星和星系要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "星和星系要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾星和星系的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c4-q1"
          }
        ]
      }
    ]
  },
  "yu-zhou-tan-mi": {
    "title": "宇宙探秘",
    "sections": [
      {
        "id": "s1",
        "titleZh": "宇宙探秘 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "宇宙探秘是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "宇宙探秘",
            "definition": "本章围绕宇宙探秘的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦宇宙探秘的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "宇宙探秘要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "宇宙探秘要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾宇宙探秘的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c5-q1"
          }
        ]
      }
    ]
  },
  "jian-dan-ji-xie-de-ying-yong": {
    "title": "简单机械的应用",
    "sections": [
      {
        "id": "s1",
        "titleZh": "简单机械的应用 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "简单机械的应用是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "简单机械的应用",
            "definition": "本章围绕简单机械的应用的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦简单机械的应用的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "简单机械的应用要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "简单机械的应用要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾简单机械的应用的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c6-q1"
          }
        ]
      }
    ]
  },
  "dian-de-ying-yong": {
    "title": "电的应用",
    "sections": [
      {
        "id": "s1",
        "titleZh": "电的应用 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "电的应用是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "电的应用",
            "definition": "本章围绕电的应用的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦电的应用的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "电的应用要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "电的应用要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾电的应用的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c7-q1"
          }
        ]
      }
    ]
  },
  "bo-he-xin-xi": {
    "title": "波和信息",
    "sections": [
      {
        "id": "s1",
        "titleZh": "波和信息 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "波和信息是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "波和信息",
            "definition": "本章围绕波和信息的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦波和信息的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "波和信息要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "波和信息要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾波和信息的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c8-q1"
          }
        ]
      }
    ]
  },
  "di-qiu-zi-yuan-de-ke-chi-xu-li-yong": {
    "title": "地球资源的可持续利用",
    "sections": [
      {
        "id": "s1",
        "titleZh": "地球资源的可持续利用 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "地球资源的可持续利用是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "地球资源的可持续利用",
            "definition": "本章围绕地球资源的可持续利用的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦地球资源的可持续利用的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "地球资源的可持续利用要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "地球资源的可持续利用要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾地球资源的可持续利用的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c9-q1"
          }
        ]
      }
    ]
  },
  "neng-yuan-de-ke-chi-xu-li-yong": {
    "title": "能源的可持续利用",
    "sections": [
      {
        "id": "s1",
        "titleZh": "能源的可持续利用 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "能源的可持续利用是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "能源的可持续利用",
            "definition": "本章围绕能源的可持续利用的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦能源的可持续利用的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "能源的可持续利用要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "能源的可持续利用要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾能源的可持续利用的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c10-q1"
          }
        ]
      }
    ]
  },
  "huan-jing-de-ke-chi-xu-fa-zhan": {
    "title": "环境的可持续发展",
    "sections": [
      {
        "id": "s1",
        "titleZh": "环境的可持续发展 · 概念",
        "blocks": [
          {
            "type": "paragraph",
            "content": "环境的可持续发展是初中高年级科学的重要章节，涵盖核心概念与实验观察。"
          },
          {
            "type": "definition",
            "term": "环境的可持续发展",
            "definition": "本章围绕环境的可持续发展的核心定义、关键术语与基本规律展开，帮助建立科学思维。"
          },
          {
            "type": "callout",
            "variant": "tip",
            "content": "学习建议：先阅读定义与图示，再动手实验，最后完成测验巩固。"
          }
        ]
      },
      {
        "id": "s2",
        "titleZh": "重点与实验",
        "blocks": [
          {
            "type": "paragraph",
            "content": "本节聚焦环境的可持续发展的重点难点，通过表格与图示梳理知识结构。"
          },
          {
            "type": "table",
            "headers": [
              "概念",
              "定义",
              "例子"
            ],
            "rows": [
              [
                "环境的可持续发展要点1",
                "关键定义",
                "日常现象"
              ],
              [
                "环境的可持续发展要点2",
                "规律与公式",
                "实验观察"
              ],
              [
                "探究方法",
                "控制变量",
                "记录与分析"
              ]
            ]
          }
        ]
      },
      {
        "id": "s3",
        "titleZh": "小结与练习",
        "blocks": [
          {
            "type": "paragraph",
            "content": "回顾环境的可持续发展的核心内容，总结易错点，并通过练习检查掌握情况。"
          },
          {
            "type": "quiz",
            "quizId": "b6-c11-q1"
          }
        ]
      }
    ]
  }
}
