"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, ClipboardCheck, Filter, Mail, MessageCircle, Quote, Search, Sparkles, Star, Users, X } from "lucide-react";
import { formatColors, guidanceColors, mentors, type Mentor } from "./mentors";
import { asset, siteConfig } from "./config";

const allGuidance = Object.keys(guidanceColors);
const allFormats = Object.keys(formatColors);

function MentorCard({ mentor, onReserve }: { mentor: Mentor; onReserve: (mentor: Mentor) => void }) {
  return (
    <article className="mentor-card reveal-card">
      <div className="card-body">
        <div className="mentor-heading">
          <div className="star-avatar"><div className="star-avatar-shape" /><img src={mentor.image} alt={`${mentor.name}的个人照片`} className="portrait" style={{ objectPosition: mentor.imagePosition ?? "center" }} /></div>
          <div className="name-row"><div><span className="mentor-index">BEICHEN STAR / {String(mentor.id).padStart(2, "0")}</span><h3>{mentor.name}</h3><p className="class-name">{mentor.className}</p></div></div>
        </div>
        <p className="direction">{mentor.direction}</p>
        <div className="tag-section">
          <p className="tag-label">可指导内容</p>
          <div className="tags">{mentor.guidance.map((tag) => <span key={tag} className={`tag ${guidanceColors[tag] ?? "tag-cyan"}`}>{tag}</span>)}</div>
        </div>
        <div className="tag-section">
          <p className="tag-label">接受交流形式</p>
          <div className="tags">{mentor.formats.map((tag) => <span key={tag} className={`tag ${formatColors[tag] ?? "format-blue"}`}>{tag}</span>)}</div>
        </div>
        <p className="intro">{mentor.intro}</p>
        <blockquote><Quote size={15} aria-hidden="true" />{mentor.quote}</blockquote>
        <button className="reserve-button" onClick={() => onReserve(mentor)}>我要预约 <ArrowRight size={17} /></button>
      </div>
    </article>
  );
}

function ReservationModal({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(`${siteConfig.apiBaseUrl}/api/reservations`, {
        method: "POST",
        credentials: "omit",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, mentorId: mentor.id, mentorName: mentor.name }),
      });
      if (!response.ok) throw new Error("提交失败，请稍后重试");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
        <button className="modal-close" aria-label="关闭预约表单" onClick={onClose}><X size={21} /></button>
        {status === "success" ? (
          <div className="success-state">
            <span className="success-icon"><CheckCircle2 size={34} /></span><p className="eyebrow">预约已提交</p>
            <h2>我们收到你的交流申请了</h2>
            <p>科协工作人员会汇总你的信息，与 {mentor.name} 协调后续联系。</p>
            <button className="primary-button" onClick={onClose}>完成</button>
          </div>
        ) : (
          <>
            <div className="modal-heading">
              <img src={mentor.image} alt="" style={{ objectPosition: mentor.imagePosition ?? "center" }} />
              <div><p className="eyebrow">预约交流</p><h2 id="reservation-title">与 {mentor.name} 交流</h2><p>{mentor.direction}</p></div>
            </div>
            <form onSubmit={submit} className="reservation-form">
              <div className="form-grid">
                <label>姓名<input name="name" autoComplete="name" required placeholder="请输入真实姓名" /></label>
                <label>学号<input name="studentId" inputMode="numeric" required placeholder="请输入学号" /></label>
                <label>班级<input name="className" required placeholder="例如：未央61" /></label>
                <label>手机号<input name="phone" type="tel" autoComplete="tel" required placeholder="用于后续联络" /></label>
                <label>微信号<input name="wechat" required placeholder="请输入微信号" /></label>
                <label>邮箱<input name="email" type="email" autoComplete="email" required placeholder="name@tsinghua.edu.cn" /></label>
              </div>
              <label>主要交流的问题<textarea name="question" required minLength={10} rows={5} placeholder="请简要描述你的背景、困惑，以及希望交流的问题" /></label>
              <label className="consent"><input name="consent" type="checkbox" value="yes" required /><span>我同意科协工作人员为安排本次交流收集并使用以上信息。信息仅用于本活动联络与匹配。</span></label>
              {status === "error" && <p className="form-error">{error}</p>}
              <button className="submit-button" disabled={status === "submitting"}>{status === "submitting" ? "正在提交…" : "提交预约"}{status !== "submitting" && <ArrowRight size={17} />}</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [guidance, setGuidance] = useState("全部");
  const [format, setFormat] = useState("全部");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredMentors = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return mentors.filter((mentor) => {
      const matchesQuery = !keyword || [mentor.name, mentor.className, mentor.direction, mentor.intro, ...mentor.guidance].join(" ").toLowerCase().includes(keyword);
      return matchesQuery && (guidance === "全部" || mentor.guidance.includes(guidance)) && (format === "全部" || mentor.formats.includes(format));
    });
  }, [query, guidance, format]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.08 });
    document.querySelectorAll(".reveal-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filteredMentors]);

  const clearFilters = () => { setGuidance("全部"); setFormat("全部"); setQuery(""); };

  return (
    <main>
      <nav className="top-nav">
        <a href="#top" className="brand" aria-label="北辰星首页"><img src={asset("images/brand-lockup.png")} alt="清华大学未央书院" /></a>
        <div className="nav-links"><a href="#about">活动介绍</a><a href="#mentors">寻找学长学姐</a><a href="#process">预约流程</a><a href="#mentors" className="nav-cta">开始预约</a></div>
      </nav>

      <div className="cosmic-continuum"><div className="continuum-sky" aria-hidden="true" /><div className="continuum-streams" aria-hidden="true"><i /><i /><i /></div>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-badge"><Sparkles size={15} /> 未央书院学业与专业指导活动</div>
          <p className="hero-kicker">BEICHEN STAR · 北辰星</p>
          <h1>在更近的经验里，<br /><span>找到自己的方向。</span></h1>
          <p className="hero-lede">认识 12 位走在不同道路上的学长学姐。关于专业、学习、科研、竞赛与未来发展，这里有一次真诚交流的入口。</p>
          <div className="hero-actions"><a className="primary-button" href="#mentors">寻找我的北辰星 <ArrowRight size={18} /></a><a className="text-button" href="#about">了解活动 <ChevronDown size={17} /></a></div>
          <div className="hero-stats"><div><strong>12</strong><span>位学长学姐</span></div><div><strong>7</strong><span>类交流主题</span></div><div><strong>1v1</strong><span>一对一交流</span></div></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-mark-wrap"><img src={asset("images/weiyang-emblem-hd.png")} alt="清华大学未央书院院徽" className="hero-mark" /></div>
          <span className="floating-star floating-star-one">✦</span><span className="floating-star floating-star-two">✧</span>
        </div>
      </section>

      <div className="stellar-story">
        <div className="story-nebula" aria-hidden="true" />
        <section className="story-about" id="about">
          <p className="story-caption">北辰星 / 学业与专业指导</p>
          <div className="story-about-layout">
            <h2>从真实经验出发，<br /><span>看见更多可能。</span></h2>
            <div className="story-prose"><p>“北辰星”学业与专业指导活动邀请北辰计划已毕业的学长学姐，为大一、大二同学提供一对一交流与指导，帮助大家增进专业认知、完善学习规划，并了解科研、竞赛及未来发展方向。</p><a href="#mentors">认识 12 位学长学姐</a></div>
          </div>
          <p className="story-inscription">每一份经验，都能照亮下一程。</p>
        </section>
        <section className="story-process" id="process">
          <div className="story-process-heading"><h2>活动流程</h2></div>
          <ol className="story-steps">
            <li><span className="story-step-number" aria-hidden="true">01</span><h3>浏览简介</h3><p>查看学长学姐的个人简介与可指导方向。</p></li>
            <li><span className="story-step-number" aria-hidden="true">02</span><h3>提交预约</h3><p>结合自身需求，选择合适的学长学姐并提交申请。</p></li>
            <li><span className="story-step-number" aria-hidden="true">03</span><h3>汇总协调</h3><p>科协工作人员汇总并协调预约信息。</p></li>
            <li><span className="story-step-number" aria-hidden="true">04</span><h3>建立联系</h3><p>预约成功后，工作人员协助双方建立联系。具体交流时间、形式和平台由双方自行协商。</p></li>
          </ol>
        </section>
      </div>
      <div className="cosmic-fade" aria-hidden="true" />
      </div>

      <section className="mentor-section" id="mentors">
        <div className="section-heading"><div><p className="eyebrow">MEET THE MENTORS</p><h2>认识你的“北辰星”</h2></div><p>每个人的路径都不相同。把你在意的问题带来，听听真实经历中的选择、试错与答案。</p></div>
        <div className="finder">
          <div className="search-box"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索姓名、专业方向或交流主题" aria-label="搜索学长学姐" />{query && <button onClick={() => setQuery("")} aria-label="清空搜索"><X size={16} /></button>}</div>
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}><Filter size={18} />筛选{(guidance !== "全部" || format !== "全部") && <span />}</button>
          <div className={`filter-panel ${showFilters ? "open" : ""}`}>
            <div className="filter-group"><span>指导内容</span><div>{["全部", ...allGuidance].map((item) => <button key={item} className={guidance === item ? "active" : ""} onClick={() => setGuidance(item)}>{item}</button>)}</div></div>
            <div className="filter-group"><span>交流形式</span><div>{["全部", ...allFormats].map((item) => <button key={item} className={format === item ? "active" : ""} onClick={() => setFormat(item)}>{item}</button>)}</div></div>
          </div>
        </div>
        <div className="result-bar"><span><Users size={17} /> 为你找到 <strong>{filteredMentors.length}</strong> 位学长学姐</span>{(guidance !== "全部" || format !== "全部" || query) && <button onClick={clearFilters}>清除筛选</button>}</div>
        {filteredMentors.length ? <div className="mentor-grid">{filteredMentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} onReserve={setSelectedMentor} />)}</div> : <div className="empty-state"><Sparkles size={28} /><h3>暂时没有匹配结果</h3><p>换一个关键词或清除筛选条件再试试。</p></div>}
      </section>

      <section className="closing-cta"><div><p className="eyebrow">START A CONVERSATION</p><h2>一个具体的问题，<br />可能就是方向的起点。</h2></div><a href="#mentors" className="primary-button">现在去寻找 <ArrowRight size={18} /></a></section>
      <footer><div><img src={asset("images/brand-lockup.png")} alt="清华大学未央书院" /><p>“北辰星”学业与专业指导活动</p></div><p><Mail size={15} /> 预约信息仅用于活动联络与匹配 <a href={siteConfig.adminUrl} className="footer-admin">活动管理</a></p></footer>
      {selectedMentor && <ReservationModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />}
    </main>
  );
}
