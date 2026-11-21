import { asset } from "./config";

export type Mentor = {
  id: number;
  name: string;
  className: string;
  direction: string;
  guidance: string[];
  formats: string[];
  intro: string;
  quote: string;
  image: string;
  imagePosition?: string;
};

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "王鹏程",
    className: "未央40",
    direction: "精密仪器 · 超分辨光学显微成像、光计算",
    guidance: ["时间规划", "科研入门", "保研相关", "课程学习", "科创竞赛", "专业认知"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "专业方向为精密仪器，目前聚焦超分辨光学显微成像研究。参加过两届挑战杯，也经历过星火计划、北辰计划的完整选拔流程。愿意分享竞赛准备、时间规划和科研起步中的真实经验。",
    quote: "科研神秘而有趣，欢迎对科研一头雾水的 uu 来与我交流讨论。",
    image: asset("images/mentor-10.png"),
    imagePosition: "50% 44%",
  },
  {
    id: 2,
    name: "戴健坤",
    className: "未央-材01",
    direction: "AI for Materials · 磁性功能薄膜与器件",
    guidance: ["专业认知", "科研入门", "时间规划", "科创竞赛"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "现直博就读于清华大学材料学院，研究方向为 AI for Materials 与磁性功能薄膜器件。具有材料、AI4Science、跨界研究和业界实习经历，乐于交流专业选择、学科交叉与科研成长。",
    quote: "任何想了解的话题都可以来聊，我很期待和大家唠嗑。",
    image: asset("images/mentor-09.png"),
    imagePosition: "50% 38%",
  },
  {
    id: 3,
    name: "孙乐然",
    className: "未央-工物11",
    direction: "工程物理 · 反应堆数值模拟、多物理场耦合、闭环设计 Agent",
    guidance: ["专业认知", "科创竞赛", "课程学习", "保研相关", "科研入门", "时间规划"],
    formats: ["微信文字或语音", "线下交流"],
    intro: "北辰一期成员，现就读于核研院，研究反应堆数值模拟与 AI 辅助闭环设计。参加过 SRT、数模、学推、挑战杯、北自然等项目，愿意分享数值计算、科研探索和科创实践经验。",
    quote: "有一个完整的探索过程，并能把它说明白，就已经非常优秀。",
    image: asset("images/mentor-07.png"),
    imagePosition: "50% 50%",
  },
  {
    id: 4,
    name: "李佳俊",
    className: "未央能动21",
    direction: "能源动力 · 燃烧仿真模拟",
    guidance: ["专业认知", "科创竞赛", "科研入门", "保研相关", "时间规划"],
    formats: ["微信文字或语音", "腾讯会议"],
    intro: "研究方向为燃烧仿真模拟。本科期间参与过多项科创计划与培养项目，希望把自己在科研尝试、项目参与和学习规划中的经验与学弟学妹分享。",
    quote: "自强不息，厚德载物。",
    image: asset("images/mentor-08.png"),
    imagePosition: "50% 42%",
  },
  {
    id: 5,
    name: "徐小婷",
    className: "未央38",
    direction: "工程物理 · X 射线成像、肺部成像",
    guidance: ["专业认知", "科研入门", "保研相关", "科创竞赛", "时间规划"],
    formats: ["微信文字或语音", "线下交流"],
    intro: "直博攻读工程物理系 X 射线多特性成像方向，目前从事肺部暗场成像研究。曾任未央科协副主席，参与多项科研科创项目并有欧洲暑研经历，也乐于聊运动、阅读和旅行。",
    quote: "打开视野，多了解，多体验！",
    image: asset("images/mentor-12.png"),
    imagePosition: "50% 70%",
  },
  {
    id: 6,
    name: "宋炫莹",
    className: "未央-工物31",
    direction: "加速器物理 · 束流物理、相干光学、AI4S",
    guidance: ["专业认知", "科研入门", "科创竞赛", "保研相关"],
    formats: ["微信文字或语音", "线下交流"],
    intro: "目前推免至工程物理系攻读博士，围绕 SSMB 稳态微聚束光源开展束流动力学、相干光学和 AI4S 研究。具有挑战杯、国自然、北自然、国家级大创及德国 DESY 暑研经历。",
    quote: "尽人事，听天命；劳逸结合，尽力就好。",
    image: asset("images/mentor-06.png"),
    imagePosition: "64% 45%",
  },
  {
    id: 7,
    name: "涂弘毅",
    className: "未央能动02",
    direction: "机械工程 · 集群机器人、物理智能、运动控制",
    guidance: ["专业认知", "科研入门", "保研相关"],
    formats: ["腾讯会议", "线下交流"],
    intro: "清华大学机械工程系博士研究生，研究集群机器人、物理智能与机器人运动控制，涉及机器人机构设计、动力学建模、强化学习和群体协同。",
    quote: "多想多试，找到有意义的事情并持续进步。",
    image: asset("images/mentor-05.png"),
    imagePosition: "50% 42%",
  },
  {
    id: 8,
    name: "魏子祺",
    className: "未央环11",
    direction: "气候模型 · 物理信息机器学习、能源系统优化",
    guidance: ["科研入门", "留学申请", "专业认知"],
    formats: ["微信文字或语音", "腾讯会议"],
    intro: "“北辰计划”一期理事长，现就读于麻省理工学院计算科学与工程、土木与环境工程方向。曾赴康奈尔、斯坦福和密歇根大学学习研究，愿意分享科研与海外学习经历。",
    quote: "苍天远比海更远。",
    image: asset("images/mentor-04.png"),
    imagePosition: "50% 40%",
  },
  {
    id: 9,
    name: "刘行",
    className: "未央-能动21",
    direction: "能源动力 · 生物质利用、工业多模态 AI、创新创业",
    guidance: ["专业认知", "科创竞赛", "时间规划", "保研相关"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "本科期间积极参与科创竞赛，获得生物质材料、数字孪生与创业等方向的二十余项奖项。现本校读硕，并参与工业多模态 AI 创业，了解成果转化、投融资和创业实践。",
    quote: "你所热爱的，就是你的生活。",
    image: asset("images/mentor-11.png"),
    imagePosition: "50% 32%",
  },
  {
    id: 10,
    name: "王昱婷",
    className: "未央-建环31",
    direction: "热管理 · 传热传质、材料热物性",
    guidance: ["专业认知", "课程学习", "科研入门"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "研究兴趣集中于传热传质、热管理与材料热物性，参与过池沸腾强化换热、陶瓷基复合材料热输运等科研工作，也参与组织过北辰计划科研交流与训练活动。",
    quote: "加油！",
    image: asset("images/mentor-03.png"),
    imagePosition: "50% 34%",
  },
  {
    id: 11,
    name: "魏妍竹",
    className: "未央能动32",
    direction: "能源与动力工程 · 跨文化交流与自我探索",
    guidance: ["留学申请", "时间规划", "专业认知"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "大学生活的主线是尝试新事物和寻找自我兴趣，对多元文化交流和时间管理有较多感触。曾赴英美澳等地实践研修，并参与阿联酋、沙特等跨国项目。",
    quote: "人生是没有指标的地图。",
    image: asset("images/mentor-02.png"),
    imagePosition: "50% 42%",
  },
  {
    id: 12,
    name: "周泽林",
    className: "未央-材31",
    direction: "能源材料 · 数据与机理驱动的电化学",
    guidance: ["保研相关", "留学申请", "专业认知", "科研入门", "科创竞赛"],
    formats: ["微信文字或语音", "腾讯会议", "线下交流"],
    intro: "北辰计划三期、星火计划十九期学员，研究数据与机理驱动的能源材料电化学，参与北京市自然科学基金、学推计划与国家级大创项目，拟赴香港理工大学攻读博士。",
    quote: "大学不只是成为更优秀的人，更是发现自己想成为怎样的人。",
    image: asset("images/mentor-01.png"),
    imagePosition: "50% 24%",
  },
];

export const guidanceColors: Record<string, string> = {
  专业认知: "tag-cyan",
  科研入门: "tag-violet",
  时间规划: "tag-amber",
  科创竞赛: "tag-rose",
  保研相关: "tag-indigo",
  课程学习: "tag-emerald",
  留学申请: "tag-orange",
};

export const formatColors: Record<string, string> = {
  微信文字或语音: "format-green",
  腾讯会议: "format-blue",
  线下交流: "format-purple",
};
