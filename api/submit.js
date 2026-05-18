import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@bridgesmediaadvisory.com';

const QUESTIONS = [
  {
    section: 'Knowledge & Strategy',
    text: 'If a board member, investor or funding body asked "what\'s your AI strategy?", how would you respond?',
    options: [
      "We'd struggle to give a confident answer",
      "We could point to some tools people are using, but nothing coordinated",
      "We could describe where we're exploring AI and why",
      "We could present a clear rationale with priorities and early results",
      "We'd lead with a structured roadmap and evidence of impact"
    ]
  },
  {
    section: 'Knowledge & Strategy',
    text: 'How clearly does your leadership team understand where AI could create commercial or operational advantage in your specific business?',
    options: [
      "Nobody at a senior level has seriously engaged with this question",
      "There's a general awareness that AI is relevant, but no structured thinking about where or how",
      "Leadership has identified some opportunities and is starting to make decisions based on them",
      "We have a clear, prioritised view of where AI creates the most value and it informs our planning",
      "We continuously track what's emerging and update our strategic view as capabilities evolve"
    ]
  },
  {
    section: 'Knowledge & Strategy',
    text: 'How does your organisation approach AI risk and responsible use?',
    options: [
      "We haven't thought about this yet",
      "It's been discussed informally but there are no guidelines",
      "We have basic principles in place and staff know what's expected (e.g. what data can and can't be shared with AI tools)",
      "We have documented policies and review them periodically",
      "AI governance is embedded in how we operate, with clear accountability at a leadership level"
    ]
  },
  {
    section: 'Workflow & Tools',
    text: 'How does your team currently use AI in daily work?',
    options: [
      "AI is not part of daily work",
      "A few individuals use ChatGPT, Claude, Copilot or Gemini for isolated tasks like improving emails or summarising documents",
      "AI tools are used consistently across multiple parts of the workflow, such as content drafting, analysis and reporting",
      "We have custom setups built for our specific work (e.g. tailored prompts, knowledge bases loaded with company context)",
      "AI is fundamental to how we operate; we continuously improve our workflows and share what works across the team"
    ]
  },
  {
    section: 'Workflow & Tools',
    text: 'What AI tools does your team actively use?',
    options: [
      "None inside work; only basic familiarity outside",
      "Some individuals use general tools like ChatGPT, Claude, Copilot or Gemini for personal productivity like improving emails",
      "A range of AI tools are used as needed across functions like content generation, strategy, analysis and reporting",
      "We use custom-configured tools and/or agents with knowledge specific to our company and industry",
      "AI-enabled workflows are integrated with our core systems and data"
    ]
  },
  {
    section: 'Workflow & Tools',
    text: 'How does your team give AI access to your organisation\'s knowledge and data?',
    options: [
      "They don't. Either company policy prohibits this or the team doesn't yet do this",
      "They manually paste relevant material into tools like ChatGPT, Claude, Copilot or Gemini as needed (e.g. pasting in a brief, a report or a client list)",
      "They have consistent ways of sharing context to enhance AI usage, with clear rules about what's appropriate",
      "AI tools are connected to internal systems and are able to pull and act on relevant information automatically",
      "Automated pipelines feed AI systems with current organisational data in a structured, governed way"
    ]
  },
  {
    section: 'Readiness & Execution',
    text: 'If you needed to build from scratch an AI solution for a specific business problem, what could your team deliver?',
    options: [
      "We wouldn't know where to start",
      "For simple tasks, we could ask an AI tool how it can help and follow basic instructions",
      "We could configure an existing platform or tool to address the problem effectively, likely in a highly manual way",
      "We could design a custom solution tailored to our domain and workflows",
      "We could build and deploy a production-ready AI application or agentic workflow"
    ]
  },
  {
    section: 'Readiness & Execution',
    text: 'How does your organisation currently educate and build AI capability in its team?',
    options: [
      "We don't; there's no structured approach",
      "Individuals learn independently when and with what tools they choose to",
      "We share useful tools, prompts and approaches informally across the team (e.g. a Slack channel or shared doc with what's working)",
      "We have a deliberate programme for building AI skills and shared practices specific to our company",
      "AI capability development is central to how we hire, onboard, and develop people"
    ]
  },
  {
    section: 'Readiness & Execution',
    text: 'How ready is your organisation to act on an AI recommendation today?',
    options: [
      "We'd need significant groundwork before we could move (budget, buy-in, skills)",
      "We could act on isolated suggestions but lack the structure for broader change",
      "We have the capacity to implement recommendations with reasonable support",
      "We're set up to move quickly with the right strategic input",
      "We have the people, tools, and processes to execute independently at pace"
    ]
  }
];

const TIERS = {
  foundations: {
    name: 'Foundations',
    headline: "You're at the starting line — and that's a good place to begin honestly.",
    summary: "Most of your organisation's AI activity is informal, uncoordinated or not yet happening. There's likely curiosity in the team, but no shared framework for acting on it. The risk at this stage isn't moving too fast — it's watching competitors build capability while you're still deciding whether to start.",
    help: "This is exactly where I work best. I help organisations like yours build a clear-eyed view of where AI adds real value in your specific context, establish basic policies that give your team confidence to experiment, and identify two or three high-return starting points that don't require a big investment. The goal is to give you a foundation to build from — not a 50-page strategy that sits in a drawer."
  },
  developing: {
    name: 'Developing',
    headline: "You're moving — but without a shared map, people are heading in different directions.",
    summary: "Your organisation has started engaging with AI, and some individuals are getting genuine value from it. But adoption is patchy, there's no consistent approach, and it's hard to know what's actually working. The opportunity cost of this stage is high: effort is being duplicated, best practices aren't spreading, and the gap between you and more structured competitors is quietly widening.",
    help: "I work with organisations at this stage to turn scattered experimentation into shared capability. That means auditing what's already working and amplifying it, building lightweight frameworks your team will actually use, and identifying where a more structured or custom AI approach would move the needle fastest. You don't need a wholesale transformation — you need the right nudges in the right places."
  },
  advanced: {
    name: 'Advanced',
    headline: "You're ahead of most — the question now is how far you want to go.",
    summary: "Your organisation has real AI capability: structured thinking, active tool use, and some degree of custom configuration. You're getting value from AI today. The challenge at this stage is usually one of depth and integration — moving from 'AI as a useful tool' to 'AI as a strategic advantage' — and ensuring your edge compounds rather than plateaus.",
    help: "At this level, I focus on the harder questions: where is AI genuinely changing your competitive position versus where is it just productivity theatre? I can help you map the next tier of opportunity — custom agents, integrated workflows, AI-native processes — and think through the governance and capability investment needed to sustain your lead. This is also where board-level AI narrative becomes important, and it's a conversation I'm well-placed to support."
  }
};

function getTier(avg) {
  if (avg <= 2) return 'foundations';
  if (avg <= 3.5) return 'developing';
  return 'advanced';
}

function getDimensionLabel(avg) {
  if (avg < 2) return 'Foundations';
  if (avg < 3) return 'Emerging';
  if (avg < 4) return 'Developing';
  return 'Advanced';
}

function buildNotificationEmail(data) {
  const { name, email, organisation, role, answers, scores } = data;
  const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
  const tierKey = getTier(avg);
  const tier = TIERS[tierKey];

  const dimAvgs = [
    (answers[0] + answers[1] + answers[2]) / 3,
    (answers[3] + answers[4] + answers[5]) / 3,
    (answers[6] + answers[7] + answers[8]) / 3
  ];

  const dimNames = ['Knowledge & Strategy', 'Workflow & Tools', 'Readiness & Execution'];

  let answersHtml = '';
  QUESTIONS.forEach((q, i) => {
    answersHtml += `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;width:50%;font-weight:600;color:#1a2560;">Q${i + 1}: ${q.text}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;">${q.options[answers[i] - 1]}</td>
      </tr>`;
  });

  let dimensionsHtml = '';
  dimNames.forEach((dn, i) => {
    const pct = Math.round(((dimAvgs[i] - 1) / 4) * 100);
    dimensionsHtml += `
      <tr>
        <td style="padding:6px 12px;width:200px;font-weight:600;color:#1a2560;">${dn}</td>
        <td style="padding:6px 12px;">${getDimensionLabel(dimAvgs[i])} (avg: ${dimAvgs[i].toFixed(1)}, ${pct}%)</td>
      </tr>`;
  });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
<div style="max-width:700px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #ddd;">
  <div style="background:#1a2560;padding:24px 32px;">
    <h1 style="color:#fff;margin:0;font-size:20px;">New AI Fluency Assessment Submission</h1>
  </div>
  <div style="padding:32px;">
    <h2 style="color:#1a2560;margin-top:0;">Respondent Details</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 12px;font-weight:600;color:#1a2560;width:150px;">Name</td><td style="padding:6px 12px;">${name}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#1a2560;">Email</td><td style="padding:6px 12px;">${email}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:600;color:#1a2560;">Organisation</td><td style="padding:6px 12px;">${organisation}</td></tr>
      ${role ? `<tr><td style="padding:6px 12px;font-weight:600;color:#1a2560;">Role</td><td style="padding:6px 12px;">${role}</td></tr>` : ''}
    </table>

    <h2 style="color:#1a2560;margin-top:32px;">Result</h2>
    <p><strong>Tier:</strong> ${tier.name}</p>
    <p><strong>Overall Average Score:</strong> ${avg.toFixed(2)}</p>

    <h2 style="color:#1a2560;margin-top:32px;">Dimension Scores</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${dimensionsHtml}
    </table>

    <h2 style="color:#1a2560;margin-top:32px;">Individual Answers</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">
      ${answersHtml}
    </table>
  </div>
</div>
</body>
</html>`;
}

function buildConfirmationEmail(data) {
  const { name, answers } = data;
  const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
  const tierKey = getTier(avg);
  const tier = TIERS[tierKey];

  const dimAvgs = [
    (answers[0] + answers[1] + answers[2]) / 3,
    (answers[3] + answers[4] + answers[5]) / 3,
    (answers[6] + answers[7] + answers[8]) / 3
  ];

  const dimNames = ['Knowledge & Strategy', 'Workflow & Tools', 'Readiness & Execution'];

  let dimensionsHtml = '';
  dimNames.forEach((dn, i) => {
    const pct = Math.round(((dimAvgs[i] - 1) / 4) * 100);
    const barWidth = `${pct}%`;
    dimensionsHtml += `
      <div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-weight:600;color:#1a2560;">${dn}</span>
          <span style="color:#666;font-size:14px;">${getDimensionLabel(dimAvgs[i])}</span>
        </div>
        <div style="background:#f0ede8;border-radius:3px;height:6px;">
          <div style="background:#1a2560;height:6px;border-radius:3px;width:${barWidth};"></div>
        </div>
      </div>`;
  });

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f3ee;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e4dc;">
  <div style="background:#1a2560;padding:32px;">
    <h1 style="color:#fff;margin:0;font-size:22px;">Your AI Fluency Assessment</h1>
    <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;">Bridges Media Advisory</p>
  </div>
  <div style="padding:32px;">
    <p style="color:#333;font-size:16px;">Hi ${name},</p>
    <p style="color:#333;font-size:16px;">Thank you for completing the AI Fluency Assessment. Here's a summary of your results.</p>

    <div style="background:#f5f3ee;border-radius:10px;padding:24px;margin:24px 0;border:1px solid #e8e4dc;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#666;">Your Result</p>
      <h2 style="margin:0 0 12px;color:#1a2560;font-size:24px;">${tier.name}</h2>
      <p style="margin:0;color:#333;font-size:15px;font-style:italic;">"${tier.headline}"</p>
    </div>

    <h3 style="color:#1a2560;">Where You Stand</h3>
    <p style="color:#333;line-height:1.6;">${tier.summary}</p>

    <h3 style="color:#1a2560;margin-top:28px;">Your Dimension Scores</h3>
    ${dimensionsHtml}

    <h3 style="color:#1a2560;margin-top:28px;">How I Can Help</h3>
    <p style="color:#333;line-height:1.6;">${tier.help}</p>

    <div style="background:#1a2560;border-radius:10px;padding:24px;margin:32px 0;text-align:center;">
      <p style="color:rgba(255,255,255,0.85);margin:0 0 16px;font-size:15px;">Ready to talk through your results?</p>
      <a href="mailto:james@bridgesmediaadvisory.com" style="display:inline-block;background:#fff;color:#1a2560;text-decoration:none;font-weight:700;padding:12px 28px;border-radius:8px;font-size:15px;">Book a Conversation</a>
    </div>
  </div>
  <div style="padding:20px 32px;border-top:1px solid #e8e4dc;text-align:center;">
    <p style="color:#999;font-size:13px;margin:0;">Bridges Media Advisory · james@bridgesmediaadvisory.com</p>
  </div>
</div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, organisation, role, answers } = req.body;

  if (!name || !email || !organisation || !Array.isArray(answers) || answers.length !== 9) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = { name, email, organisation, role: role || '', answers };

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: 'james@bridgesmediaadvisory.com',
        subject: `AI Fluency Assessment — New Submission: ${name}, ${organisation}`,
        html: buildNotificationEmail(data)
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your AI Fluency Assessment — Bridges Media Advisory',
        html: buildConfirmationEmail(data)
      })
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
