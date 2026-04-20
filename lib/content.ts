export interface ProjectEntry {
  id: string;
  name: string;
  eyebrow: string;
  year: string;
  status: 'Live' | 'In Progress' | 'Concept';
  summary: string;
  detail: string;
  href?: string;
  previewImage?: string;
  previewDomain?: string;
}

export interface WritingEntry {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  date?: string;
  body: string[];
  markdown?: string;
  xPostUrl?: string;
}

export const projectEntries: ProjectEntry[] = [
  {
    id: 'bes-erp-system',
    name: 'Bescanada',
    eyebrow: 'enterprise system',
    year: '2026',
    status: 'In Progress',
    summary:
      'A ERP system designed for small blinds companies.',
    detail:
      'Still in progress, focused on supporting the day-to-day operations, coordination, and workflow management needs of smaller blinds businesses.',
    href: 'https://www.bescanada.com/',
    previewDomain: 'bescanada.com',
  },
  {
    id: 'new-art-blinds',
    name: 'New Art Blinds',
    eyebrow: 'marketing website',
    year: '2025',
    status: 'Live',
    summary:
      'Official Website for New Art Blinds, a custom window coverings brand, focused on clarity, trust, and lead generation.',
    detail:
      'Responsible for the design and development of their official website, shaping a cleaner presentation of products, services, and contact flow.',
    href: 'https://newartblinds.com/',
    previewDomain: 'newartblinds.com',
  },
  {
    id: 'taptune',
    name: 'TapTune',
    eyebrow: 'macOS utility',
    year: '2023',
    status: 'Live',
    summary:
      'Mechanical keyboard sound simulator for macOS, focused on playful feedback and lightweight utility design.',
    detail:
      'Custom sound profiles, real-time visual response, and a compact multilingual desktop experience.',
    href: 'https://github.com/lunalogs/TapTune',
    previewImage: '/images/taptune-icon.png',
    previewDomain: 'TapTune',
  },
];

export const writingEntries: WritingEntry[] = [
  {
    id: 'x-post-embedded-note',
    eyebrow: 'Field note 01',
    title: '等靠要：一种隐蔽的精神绝症',
    summary: '《天道》中的文化属性与自救之道',
    date: '2026.04.20',
    body: [],
    markdown: `《天道》中丁元英讲：透视社会依次有三个层面，技术、制度和文化。小到一个人，大到一个国家一个民族，任何一种命运归根到底都是那种文化属性的产物。强势文化造就强者，弱势文化造就弱者，这是规律，也可以理解为所谓天道，不以人的意志为转移。

> 强势文化：遵循事物规律的文化
> 
> 弱势文化：依赖强者的道德期望破格获取的文化

遇到问题陷入无助的恐慌，先问有没有人能救我，遇到困境先盼有没有外力能帮我翻盘。他把这种思维叫做弱势文化。而强势文化：这世上原本就没有什么神话，所谓神话，不过是常人的思维所不易理解的平常事。

“文化属性”四个字不是一个文学性的修辞，而是一把解剖刀。剖开的不是社会，不是民族，是每一个具体的人身上那些连自己都未曾察觉的思维惯性。我们以为自己是在做选择，其实很多时候只是在执行文化基因的预设程序。

你信什么，你就成为什么。你求的是自己，还是求的是救世主。

## 强势文化

丁元英的原话极简：“遵循事物规律的文化”。所谓规律，就是因果。种什么因，得什么果。

丁元英在五台山与智玄大师论道时谈：弱势得救之道，也有也没有。没有竞争的社会就没有活力，而竞争必然会产生贫富、产生等级，此乃天道，不是什么道德审判的结果，而是规律本身。强势文化的人看懂这一点，所以不怨天，不尤人，一切从条件出发，从规律出发，不靠幻想填补现实的裂缝。他们走的那条路，丁元英借武学之喻称之为“秘笈”。不是因为它华丽，而是因为它深奥难懂，需要人放下自我感觉、放下固有观念、放下揣测与臆想，一切以客观条件为凭。这种文化不可能成为流行品种，因为它要求人先承认自己的无知与有限，再把“我”缩到最小，让规律本身浮现出来。这太难了。大多数人宁可信一个虚幻的“靠”字，也不愿走进这条冷峻的窄门。

## 弱势文化

丁元英说弱势文化“就是依赖强者的道德期望破格获取的文化，也是期望救主的文化”。

这里的要害不在“弱”，而在一个“靠”字。传统观念的死结就在这个字上，在家靠父母，出门靠朋友，靠上帝、靠菩萨、靠皇恩，总之靠什么都行，就是别靠自己。“破格获取”四个字尤其值得细品：它不是说通过努力突破规则，而是期望不遵循正常规则、不付出相应代价就能获得回报。等一个机会，等一个贵人，等一个时代的风口，本质上都是在等一份不属于自己的东西从天而降。这种文化之所以广为流行，恰恰因为它容易。它不需要人直面规律，不需要人承认自身的因果责任，只需要把自己放得很低，然后把全部希望押在“有人能拉我一把”这个假设上。弱势文化易学、易懂、易用，于是成了流行品种。满大街都是。

## “当生则生，当死则死”

《天道》里用刘冰、叶晓明、丁元英、芮小丹四个人阐述两种文化。四种对“靠”与“立”的选择，最终走向了完全不同的终点。他们的故事不是寓言，而是实验：把两种文化的密码注入不同的人格，看命运如何自行展开。

四个人，四种结局。丁元英的担忧在格律诗启动之前就已经埋下：“让井底的人扒着井沿看一眼再掉下去，会不会患上精神绝症？”刘冰就是这个答案本身。他参与格律诗项目，抱着的是空手套白狼的心态，想获取利益却不愿承担任何风险。丁元英离开古城前给了他一只文件袋，里面是白纸。刘冰拿着它去勒索公司，发现真相后从楼上跳下。他死在最后一丝“破格获取”的幻想破灭之时。

叶晓明比刘冰聪明，也有能力。他是格律诗的发起人、总经理，论商业头脑远在刘冰之上。但面对同一场诉讼，他选择了和刘冰一起退股。为什么？因为“算不清”。他算不清丁元英的布局，算不清诉讼的走向，更算不清自己究竟能承担多少。他想靠丁元英这个高人带他赢，却不愿意自己为决策的后果买单。有机会接触强势文化，甚至能把它辨认出来，但最终因为认知的局限退回了“等靠要”的舒适区。叶晓明和刘冰不一样，他是看见了门在哪里的，只是没有推开它的勇气。看清了，却做不到，有时候比看不清更让人煎熬。

丁元英是强势文化在书中的极致践行者。私募基金、格律诗布局，每一步都精准地踩在规律上，不拖泥带水。他不执着于出人头地，说“有口饭吃就知足”，是抵达某个层面之后自然松下来的状态。但五台山论道，他问大师“弱势得救之道”，大师回他“大爱不爱”。他讨的是心安，不是要从根本上拯救谁。他能看到规律、运用规律，但他还在“寻道”的路上，还在“悟”的过程里。

丁元英对芮小丹说：“你的生存状态不是病态，用佛教的话说是自性无所挂碍，是自在。自在是什么？就是解脱。参来参去，我不如你。”丁元英的强势文化是修出来的，芮小丹的境界是自性本来具足的。她不需要刻意去“遵循规律”，她的本性就是与规律合一的。“当生则生，当死则死”，她不需要任何人告诉她该怎么做。

四个人物组成一道阶梯。刘冰困在贪嗔痴里走不出来，叶晓明看清了一步却迈不出第二步，丁元英敬畏规律但还在修行的半路上，芮小丹自性无所挂碍、当生当死。一层有一层的命，一层有一层的牢笼，一层也有一层的解脱。你站哪一层，不取决于你读了多少书、认识多少人，取决于你究竟愿意对自己负多少责。

## 从弱势文化到强势文化

弱势文化不是某个群体的标签，而是每个人都会染上的思维惯性。那个总说“等房价跌了再入手”的人；那个在岗位上熬了十年，只盼着哪位贵人赏识的职场人；那个开口闭口“原生家庭”，把一切不如意都推给出身的年轻人——毫无关联，却在同一个逻辑里打转：等一个外部力量来改变自己的处境。

等靠要，三个字从不挑剔对象。靠父母、靠朋友、靠运气、靠政策，本质上都一样：把自己的人生支点，放在别人手里。弱势文化之所以顽固，恰恰因为它披着合理的外衣，在每一次“我只是暂时借力”的自我安慰中，瓦解了人站起来的能力。

强势文化也并非高不可攀的殿堂。欧阳雪出身底层，没有背景，她对自己的认知极其清晰：“我只会开饭馆”。格律诗官司最凶、股票浮盈几十倍的时候，她都不为所动，回去守着自己的饭馆。守住本分，就是遵循规律。这是强势文化最朴素的起点。肖亚文也是如此。她入股格律诗时说，“如果败诉了，我就回去打工”。做好为自己的决定承担后果的准备，然后下注。

丁元英说，“救主不是人，是道”。没有什么救世主会踩着祥云来拯救你，只要心里还等着被救，那把椅子你永远坐不稳。芮小丹说：“只要不是我觉到、悟到的，你给不了我，给了我也拿不住。”每一个真正属于你的东西，都必须经由你自己的手，一寸一寸拿回来。

《天道》小说原名是《遥远的救世主》。救世主遥远，因为它不在外面，在每个人心中。而人最难的事就是回到自己心里去，我们太容易向外追逐了。

“神即道，道法自然，如来”，规律不因你的祈祷而动摇，不偏袒任何人，也不辜负任何人。你遵循它，它就为你让路。`,
  },
];
