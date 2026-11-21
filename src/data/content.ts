export type Section = {
  id: string;
  num: string;
  label: string;
  title: string;
  lede: string;
  time: string;
  gist: string;
  priority: 'start' | 'core' | 'later' | 'proof';
  skipIf?: string;
};

export type Path = {
  id: string;
  name: string;
  short: string;
  license: 'required' | 'sometimes' | 'no';
  licenseNote: string;
  daily: string;
  where: string;
  degree: string;
  money: string;
  watch: string;
};

export type Faq = { q: string; a: string; group: string };
export type Source = { name: string; org: string; date: string; url: string; settles: string };

export const PROFILE = {
  age: '17',
  place: 'Delhi',
  stream: 'Humanities',
  intake: '2027',
  checked: 'November 2026',
};

export const SECTIONS: Section[] = [
  {
    id: 'start',
    num: '01',
    label: 'Start here',
    title: 'The short answer, before the details',
    time: '5 min',
    gist: 'The route, the three moves, and what to ignore.',
    priority: 'start',
    lede: 'If you only read one page, read this one. It is the route I would take, the trap I would avoid, and the three things worth doing this month.',
  },
  {
    id: 'psychology',
    num: '02',
    label: 'Psychology',
    title: 'What you are actually signing up to study',
    time: '6 min',
    gist: 'What the degree is, and what it is not.',
    priority: 'core',
    lede: 'Psychology is a science of behaviour and mind. It is not mind reading, and it is not only therapy. Here is what the four years contain, and where the line sits between studying it and practising it.',
  },
  {
    id: 'paths',
    num: '03',
    label: 'Which path',
    title: 'Eight kinds of psychologist, and who needs a licence',
    time: '6 min',
    gist: 'Eight branches, and which ones need a licence.',
    priority: 'core',
    lede: 'You do not choose a specialisation at 17. You choose it in your master’s. Still, knowing the landscape now helps you pick the right degree and the right entrance exam.',
  },
  {
    id: 'admissions',
    num: '04',
    label: 'Getting in',
    title: 'The exams, the quotas, and the scores that matter',
    time: '8 min',
    gist: 'CUET, the Delhi quota, Jamia’s test, and the scores.',
    priority: 'core',
    lede: 'Three doors matter most for you. Delhi University through CUET, Ambedkar University through CUET and its Delhi quota, and Jamia through its own test. Each has one rule that catches people out.',
  },
  {
    id: 'roadmap',
    num: '05',
    label: 'The roadmap',
    title: 'Ages 17 to 30, one year at a time',
    time: '6 min',
    gist: 'Ages 17 to 30, year by year.',
    priority: 'core',
    lede: 'This is the long view. Nothing here is a race. The point is to avoid losing a year to a wrong turn, and to know what each stage is for.',
  },
  {
    id: 'teaching',
    num: '06',
    label: 'Teaching',
    title: 'Teaching is a real career. It is just a different one.',
    time: '7 min',
    gist: 'The honest cost of D.El.Ed and JBT.',
    priority: 'later',
    skipIf: 'Skip for now if teaching is not on your mind. Read it before you consider D.El.Ed or JBT.',
    lede: 'You have thought about D.El.Ed or JBT, probably because someone said it leads to a government job quickly. Some of that is true. Most of the speed is not. Here is the honest version, state by state.',
  },
  {
    id: 'money',
    num: '07',
    label: 'Money',
    title: 'Earning while you study, without wrecking your degree',
    time: '6 min',
    gist: 'What you can earn, and how many hours it costs.',
    priority: 'later',
    skipIf: 'Skip for now if money is not a worry. Read it before you take a job during term.',
    lede: 'You want your own money, and you can have it. The rule is simple. A full-time job and a full-time degree cannot share a day.',
  },
  {
    id: 'doubts',
    num: '08',
    label: 'Doubts',
    title: 'The questions you have not asked out loud',
    time: '3 min',
    gist: 'Thirty-four short answers, grouped by theme.',
    priority: 'later',
    skipIf: 'Use this as a lookup page. Search it when a question comes up, not before.',
    lede: 'Short answers to the things that keep circling. Search them, or open the ones that sound like you.',
  },
  {
    id: 'sources',
    num: '09',
    label: 'Sources',
    title: 'Where every claim comes from',
    time: '2 min',
    gist: 'Every official document, with dates.',
    priority: 'proof',
    skipIf: 'Come here to check a number or a rule. You do not need to read it first.',
    lede: 'Every number on this site traces back to a government notice, a university bulletin, or a prospectus. The date matters as much as the link, so both are here.',
  },
];

export const ROUTE = [
  { year: '2027', age: '18', title: 'CUET and the BA', body: 'Four-year B.A. (Hons.) Psychology at Delhi University, AUD, or Jamia.' },
  { year: '2031', age: '22', title: 'Master’s', body: 'Clinical, counselling, or organisational. Two years, full time.' },
  { year: '2033', age: '24', title: 'Licence or PhD', body: 'RCI registration for clinical practice, or UGC NET and a funded PhD.' },
  { year: '2036', age: '27', title: 'The work', body: 'Practice, research, a university post, or a school counselling office.' },
];

export const CORE_ORDER = ['psychology', 'paths', 'admissions', 'roadmap'];
export const READ_LATER = ['teaching', 'money', 'doubts', 'sources'];

export const PATHS: Path[] = [
  {
    id: 'clinical',
    name: 'Clinical psychology',
    short: 'Diagnosis and therapy for serious mental health conditions, usually in hospitals.',
    license: 'required',
    licenseNote: 'You need an RCI-recognised master’s plus registration on the Central Rehabilitation Register. Practising without it is illegal.',
    daily: 'Diagnostic interviews, standardised tests, case formulation, and therapy for conditions such as depression, OCD, bipolar disorder, and psychosis. You work alongside psychiatrists, not instead of them.',
    where: 'Government and private psychiatric hospitals, general hospital psychiatry units, rehabilitation centres.',
    degree: 'Four-year B.A./B.Sc. Psychology at 55% or more, then a two-year RCI M.A. or M.Clin.Psy. A three-year degree needs a bridge year, or the first year of a master’s.',
    money: 'Trainee stipends vary by hospital. Entry hospital posts and private practice both depend on the city and your licence.',
    watch: 'Psychologists in India cannot prescribe medicine. That is a psychiatrist’s job, and it needs an MBBS and an MD.',
  },
  {
    id: 'counselling',
    name: 'Counselling psychology',
    short: 'Support for stress, grief, relationships, and life decisions.',
    license: 'no',
    licenseNote: 'No RCI licence for general counselling, but degrees must be regular mode. Distance psychology is closed under the NCAHP Act.',
    daily: 'Talk-based therapy for people who are not necessarily unwell. You help with anxiety, transitions, study pressure, relationships, and burnout. You refer serious psychiatric cases on.',
    where: 'Schools, colleges, employee assistance programmes, wellness clinics, private practice.',
    degree: 'B.A. Psychology, then a regular two-year M.A. or M.Sc. in counselling or applied psychology.',
    money: 'School counsellor salaries are steady. Private session rates depend on reputation and city.',
    watch: 'You will spend as much time on boundaries as on technique. Do not take on cases beyond your training.',
  },
  {
    id: 'school',
    name: 'School and educational psychology',
    short: 'Learning difficulties, exam access, and student wellbeing inside a school.',
    license: 'no',
    licenseNote: 'School counselling needs no RCI licence. Formal special-education or disability certification does.',
    daily: 'Assess learning difficulties, plan support for students, advise teachers, handle exam accommodations, and run wellbeing programmes.',
    where: 'CBSE, ICSE, and IB schools, assessment centres, education consultancies.',
    degree: 'B.A. Psychology plus an M.A. in educational or school psychology. A B.Ed helps if you also want a teaching role.',
    money: 'Salaries track school pay scales. Senior counsellors in good schools do well.',
    watch: 'You will work with parents as much as students. That is the job, not an interruption.',
  },
  {
    id: 'child',
    name: 'Child and developmental psychology',
    short: 'How children grow, and where development needs support.',
    license: 'sometimes',
    licenseNote: 'Guidance work needs no licence. Issuing statutory disability certificates needs RCI registration.',
    daily: 'Assess developmental delays, autism, ADHD, and childhood anxiety. Work with parents, schools, and paediatricians.',
    where: 'Child guidance clinics, paediatric hospitals, inclusive schools, early-intervention centres.',
    degree: 'B.A. Psychology plus an M.A. in child or developmental psychology. For clinical disability work, the RCI clinical route.',
    money: 'Hospital and clinic roles. Trainee stipends depend on the placement.',
    watch: 'Children cannot explain themselves the way adults can. Assessment skill matters more here than talk.',
  },
  {
    id: 'io',
    name: 'Organisational psychology',
    short: 'Hiring, performance, workplace culture, and why people leave.',
    license: 'no',
    licenseNote: 'No statutory licence. Employers care about psychometrics, data, and judgment.',
    daily: 'Build hiring tests, study attrition, design employee surveys, coach managers, and improve how teams work.',
    where: 'Consultancies, corporate HR teams, HR technology firms, large employers in every sector.',
    degree: 'B.A. Psychology plus an M.A. or M.Sc. in organisational psychology, or an MBA in HR.',
    money: 'The best-paid psychology route straight out of a master’s, especially in consulting and technology.',
    watch: 'This is not therapy. If you want to work with distress, this is the wrong branch.',
  },
  {
    id: 'research',
    name: 'Research and cognitive psychology',
    short: 'Experiments on attention, memory, decision-making, and how people use tools.',
    license: 'no',
    licenseNote: 'No licence. The currency here is publications, methods, and statistics.',
    daily: 'Design experiments, run them, clean data, model results, write papers. In industry, this often turns into user research.',
    where: 'University labs, cognitive science centres, product research teams, policy research groups.',
    degree: 'Four-year B.A. with a research thesis, then a master’s and PhD in cognitive or experimental psychology.',
    money: 'Funded PhD stipends, research grants, and strong industry pay for user research.',
    watch: 'You will spend real time with statistics and code. If you dread that, choose a different branch.',
  },
  {
    id: 'health',
    name: 'Health psychology',
    short: 'Why people follow or ignore medical advice, and how to help them cope.',
    license: 'no',
    licenseNote: 'No statutory licence for behavioural health work. Hospital roles may add their own requirements.',
    daily: 'Help patients manage chronic illness, pain, cardiac recovery, diabetes, and cancer treatment. Design adherence programmes.',
    where: 'Hospitals, cancer centres, public health programmes, NGOs.',
    degree: 'B.A. Psychology plus an M.A. or M.Sc. in health or applied psychology.',
    money: 'Hospital and public health salaries. Grant-funded projects vary a lot.',
    watch: 'You work inside medicine. Learn the language and respect the hierarchy.',
  },
  {
    id: 'community',
    name: 'Community and social psychology',
    short: 'Mental health at the level of a neighbourhood, not one client.',
    license: 'no',
    licenseNote: 'No licence for community prevention work. Clinical diagnosis still needs the clinical route.',
    daily: 'Run community programmes, train frontline health workers, study group behaviour, and advise on policy.',
    where: 'NGOs, UN agencies, public health departments, research institutes, policy think tanks.',
    degree: 'B.A. Psychology plus an M.A. in applied, community, or social psychology. An MSW also works.',
    money: 'Development sector salaries. Lower than corporate roles, meaningful work, and strong international options later.',
    watch: 'Change is slow. If you need quick wins, this will frustrate you.',
  },
];

export const EXTRA_PATHS = [
  { name: 'Neuropsychology', body: 'Brain injury, memory, and cognitive rehabilitation. Usually a clinical route with hospital training.' },
  { name: 'Forensic psychology', body: 'Courts, prisons, and criminal behaviour. Few posts, and evidence rules are strict.' },
  { name: 'Sports psychology', body: 'Performance, focus, and recovery for athletes. Small field, strong niche.' },
  { name: 'Rehabilitation psychology', body: 'Disability, function, and reintegration. RCI registration is required.' },
];

export const DU_CUTOFFS = [
  { college: 'Lady Shri Ram (W)', programme: 'B.A. (Hons.) Psychology', score: '926.53' },
  { college: 'Jesus and Mary (W)', programme: 'B.A. (Hons.) Psychology', score: '898.80' },
  { college: 'Indraprastha (W)', programme: 'B.A. (Hons.) Psychology', score: '878.06' },
  { college: 'Daulat Ram (W)', programme: 'B.A. (Hons.) Psychology', score: '874.16' },
  { college: 'Gargi (W)', programme: 'B.A. (Hons.) Applied Psychology', score: '860.93' },
  { college: 'Aryabhatta', programme: 'B.A. (Hons.) Psychology', score: '837.88' },
  { college: 'Zakir Husain', programme: 'B.A. (Hons.) Psychology', score: '793.07' },
  { college: 'Bharati (W)', programme: 'B.A. (Hons.) Psychology', score: '767.01' },
];

export const ADMISSION_DOORS = [
  {
    id: 'du',
    name: 'Delhi University',
    exam: 'CUET UG',
    strength: 'The widest choice of colleges, and the name most people recognise.',
    rule: 'You must write CUET in the subjects you studied or are studying in Class 12. If you did not take Psychology in Class 12, do not choose it in CUET.',
    note: 'Seat counts and cutoffs change every year. The 2025 general-category first-round scores are on this page as a reference, not a target.',
  },
  {
    id: 'aud',
    name: 'Ambedkar University Delhi',
    exam: 'CUET UG',
    strength: '85% of seats are reserved for candidates from Delhi. It is the calmest strong option for a Delhi student.',
    rule: 'You register on the AUD portal with your CUET details. The Delhi quota applies to candidates from the National Capital Territory, so keep your documents ready.',
    note: 'In 2026-27, AUD offered 1,194 undergraduate seats across 23 programmes. Both three-year and four-year NEP routes were available.',
  },
  {
    id: 'jmi',
    name: 'Jamia Millia Islamia',
    exam: 'Jamia’s own entrance test',
    strength: 'The lowest fee of the three, and a strong department.',
    rule: 'Jamia does not use CUET for this programme. It runs its own test, usually in April. In 2026-27 the B.A. (Hons.) Psychology intake was 42 seats at 13,475 rupees a year.',
    note: 'Eligibility was 50% in the best five Class 12 papers, any stream. Forms normally open in February and close in March.',
  },
];

export const TIMELINE = [
  {
    age: '17',
    year: '2026-27',
    title: 'Class 12, and the subjects that decide your CUET',
    action: 'Score above 85%. Write CUET in English plus the four subjects you actually study. Register for Jamia’s own test too, since it costs you one more form and opens a second door.',
    warning: 'Do not add CUET Psychology unless Psychology is on your Class 12 marksheet. Delhi University will not map it.',
  },
  {
    age: '18',
    year: '2027-28',
    title: 'Year one of the BA',
    action: 'Start at DU, AUD, or Jamia. Aim for 7.5 CGPA from the first semester, because the four-year research route and a funded PhD both depend on it. Begin tutoring for pocket money.',
    warning: 'Cap term-time work at about ten hours a week. Attendance rules are not optional.',
  },
  {
    age: '19',
    year: '2028-29',
    title: 'Year two, methods and labs',
    action: 'Learn psychometrics properly. Get comfortable with SPSS or R. Take a summer internship in an NGO, school, or hospital. At 18 you can now sign your own contracts.',
    warning: 'An unpaid internship is learning. A paid tutoring slot is income. Do not confuse the two when you plan your week.',
  },
  {
    age: '20',
    year: '2029-30',
    title: 'Year three, the difficult material',
    action: 'Abnormal psychology, counselling frameworks, and your first serious independent project. Keep your grades up so the fourth-year research year stays open.',
    warning: 'Do not exit after three years to save time. The fourth year is what unlocks the clinical and PhD shortcuts.',
  },
  {
    age: '21',
    year: '2030-31',
    title: 'Year four, the thesis',
    action: 'Complete a small empirical dissertation. Graduate at 22 with a four-year honours degree and direct eligibility for the RCI clinical master’s.',
    warning: 'A four-year degree with 75% or a 7.5 CGPA is the threshold for the direct PhD route. Know your number before you apply.',
  },
  {
    age: '22',
    year: '2031-32',
    title: 'Master’s year one',
    action: 'Clinical, counselling, or organisational. Sit UGC NET in your second year if academia or a funded PhD is on the table.',
    warning: 'Never join a distance or online psychology master’s. It is not recognised, and no amount of convenience fixes that.',
  },
  {
    age: '24',
    year: '2033-34',
    title: 'Licence, or a funded PhD',
    action: 'Finish the clinical master’s and register with the RCI, or start a PhD on a UGC fellowship. Either way, you are now earning and qualified.',
    warning: 'A UGC JRF is a full-time fellowship. Do not take outside paid work while you hold it.',
  },
  {
    age: '29',
    year: '2038-40',
    title: 'The long career',
    action: 'Defend the PhD, publish, and apply for a university post, a senior hospital role, or a research leadership job. Or stay in practice and build a caseload.',
    warning: 'A PhD is a qualification, not a guaranteed job. Permanent posts are limited and competitive.',
  },
];

export const TEACHING_STATES = [
  {
    state: 'Delhi',
    afterTwelfth: 'Yes',
    detail: '10+2 with 50% or more. Upper age limit 24 as on 30 September, with relaxation for SC, ST, and PwD candidates.',
    admission: 'A 150-question computer-based test, 150 marks, two hours, no negative marking.',
    catch: 'It is a full-time two-year diploma. It does not run alongside a regular BA.',
  },
  {
    state: 'Uttar Pradesh',
    afterTwelfth: 'No',
    detail: 'A completed bachelor’s degree is required. Class 12 alone is not enough.',
    admission: 'Merit built from Class 10, Class 12, and graduation marks.',
    catch: 'You cannot use it as a shortcut straight out of school.',
  },
  {
    state: 'Madhya Pradesh',
    afterTwelfth: 'Yes',
    detail: 'Eligible after Class 12 with 50% or more, subject to the current notification.',
    admission: 'Merit based on Class 12 board marks.',
    catch: 'Still a full-time course, so it competes with a regular degree.',
  },
];

export const EARN_WAYS = [
  {
    name: 'Neighbourhood tutoring',
    when: 'Now, at 17',
    range: '4,000 to 10,000 a month',
    body: 'Class 1 to 10, or Class 11 Humanities. Two or three batches a week. No capital, no platform, no age problem. Start with families you already know.',
  },
  {
    name: 'Freelance writing',
    when: 'Now, at 17',
    range: '500 to 2,000 an article',
    body: 'Study notes, school blog posts, and simple explainers. A guardian signs the contract until you turn 18. Build three samples before you pitch anyone.',
  },
  {
    name: 'Paid internship',
    when: 'At 18',
    range: '8,000 to 20,000 a month',
    body: 'HR sourcing, content, research assistance, or NGO programme support. Summer and winter breaks only. This is where the CV lines come from.',
  },
  {
    name: 'Research assistant',
    when: 'Master’s',
    range: '5,000 to 15,000 a month',
    body: 'Coding survey data, literature reviews, and running participants for a professor’s project. The best preparation for a PhD, and it pays.',
  },
];

export const CHECKLIST = [
  { id: 'c1', text: 'Write down the five subjects on your Class 12 marksheet. These become your CUET papers.' },
  { id: 'c2', text: 'Open the DU, AUD, and Jamia admission pages. Save each one. Note the month forms open.' },
  { id: 'c3', text: 'Ask two people with a psychology degree what their ordinary working day looks like.' },
  { id: 'c4', text: 'Decide your term-time earning cap in hours per week, and write it somewhere you will see.' },
  { id: 'c5', text: 'Check whether your family income makes you eligible for fee waivers at AUD or Delhi schemes.' },
];

export const IGNORE = [
  'Any distance or online psychology degree. The UGC closed these from the July-August 2025 session.',
  'Advice to rush into D.El.Ed or JBT for a quick government job. The exam pipeline alone can take a year or more.',
  'Private nursery teacher training certificates sold as a shortcut into government schools.',
  'Any course that promises a licence without the RCI-recognised qualification.',
];

export const FAQS: Faq[] = [
  {
    group: 'The big picture',
    q: 'Do I have to decide my whole career at 17?',
    a: 'No. You are choosing a degree, not a life. A psychology BA keeps human resources, research, teaching, social work, civil services, and communications open. You choose the specialisation during your master’s, around age 22.',
  },
  {
    group: 'The big picture',
    q: 'Is psychology a good choice for a Humanities student?',
    a: 'Yes. Delhi University, AUD, and Jamia do not require Psychology or Mathematics in Class 12. You will learn statistics from the beginning, but the maths is practical and bounded.',
  },
  {
    group: 'The big picture',
    q: 'What if I change my mind after the BA?',
    a: 'You will still have a four-year degree, research training, and a useful set of skills. People move from psychology into HR, product research, public health, journalism, and civil services. The degree does not lock you in.',
  },
  {
    group: 'The big picture',
    q: 'Should I take a gap year if I do not get the college I want?',
    a: 'Usually no. The college matters less than the degree and what you do with it. A strong master’s from a good department can follow a BA from a quieter college. A gap year costs a year and rarely changes the outcome enough to justify it.',
  },
  {
    group: 'Psychology and practice',
    q: 'What is the difference between a psychologist and a psychiatrist?',
    a: 'A psychiatrist is a medical doctor. They complete MBBS and an MD in psychiatry, and they can prescribe medicine. A psychologist studies behaviour and mind, usually through a master’s and often a doctorate. In India, a psychologist cannot prescribe psychiatric medicine.',
  },
  {
    group: 'Psychology and practice',
    q: 'Can I become a clinical psychologist with a regular M.A. in Psychology?',
    a: 'No. Clinical practice and diagnosis need an RCI-recognised qualification and registration on the Central Rehabilitation Register. A general M.A. with a clinical elective does not give you that registration.',
  },
  {
    group: 'Psychology and practice',
    q: 'What happened to the M.Phil in Clinical Psychology?',
    a: 'The UGC allowed the last M.Phil intake in clinical psychology in the 2025-26 session. From 2026-27 the RCI replaced it with a two-year M.A. in Clinical Psychology. In May 2026 the RCI also approved the name Master in Clinical Psychology, or M.Clin.Psy.',
  },
  {
    group: 'Psychology and practice',
    q: 'Can I do a distance or online psychology degree?',
    a: 'No. On 12 August 2025 the UGC stopped recognising psychology programmes in open, distance, and online mode under the NCAHP Act, 2021. No new admissions are allowed from the July-August 2025 session.',
  },
  {
    group: 'Psychology and practice',
    q: 'Is psychology heavy on mathematics?',
    a: 'There is statistics, but not calculus. You will learn mean, standard deviation, correlation, t-tests, and analysis of variance, then use software such as SPSS or R. Most students find it manageable if they attend the labs.',
  },
  {
    group: 'Psychology and practice',
    q: 'Do I need Psychology in Class 12?',
    a: 'Not for DU, AUD, or Jamia. But for Delhi University you must write CUET in the subjects you studied in Class 12. If Psychology is not on your marksheet, do not select it in CUET.',
  },
  {
    group: 'Psychology and practice',
    q: 'What can I do with only a BA?',
    a: 'You can work in human resources, research assistance, content, NGO programmes, school support, or market research. You cannot diagnose, do therapy, or call yourself a clinical psychologist. The BA is a foundation, not a licence.',
  },
  {
    group: 'Psychology and practice',
    q: 'How much does a clinical trainee earn?',
    a: 'It depends on the hospital. Some government institutes pay a stipend during the two-year clinical master’s. Private institutions often charge fees instead. Ask the department directly before you accept a seat.',
  },
  {
    group: 'Admissions',
    q: 'Which entrance exam do I write?',
    a: 'CUET UG for Delhi University, AUD, and BHU. Jamia’s own entrance test for its psychology programme. Later, CUET PG or a university test for your master’s.',
  },
  {
    group: 'Admissions',
    q: 'Which CUET subjects should I choose?',
    a: 'One language, usually English, plus four subjects you actually study. If you take History, Political Science, Geography, and Sociology, those are your four. You have up to five papers in total.',
  },
  {
    group: 'Admissions',
    q: 'Does the CUET Psychology paper help?',
    a: 'Only if you studied Psychology in Class 12 and Delhi University can map it to your marksheet. Taking it without the school subject can invalidate that paper for DU admissions.',
  },
  {
    group: 'Admissions',
    q: 'What is AUD’s Delhi quota?',
    a: 'Eighty-five per cent of AUD’s undergraduate seats are reserved for candidates from the National Capital Territory of Delhi. The remaining 15 per cent is open to the rest of India. Check the current brochure for the exact documents.',
  },
  {
    group: 'Admissions',
    q: 'How is Jamia different?',
    a: 'Jamia runs its own entrance test instead of using CUET for this programme. In 2026-27 the intake was 42 seats at 13,475 rupees a year, with eligibility set at 50% in the best five Class 12 papers.',
  },
  {
    group: 'Admissions',
    q: 'What DU score do I need?',
    a: 'In the 2025 first round, general-category scores were 926.53 at Lady Shri Ram, 898.80 at Jesus and Mary, and 878.06 at Indraprastha. A score above 900 gives you a real shot at the top colleges. Above 830 is competitive in several good ones. These are references, not guarantees.',
  },
  {
    group: 'Admissions',
    q: 'What if I do not get into Delhi University?',
    a: 'Take AUD, Jamia, BHU, or a strong state university. What matters is a four-year degree with research, good grades, and a real master’s later. The same RCI and UGC rules apply wherever you study.',
  },
  {
    group: 'Admissions',
    q: 'Should I choose the three-year or four-year degree?',
    a: 'Choose four. It gives direct eligibility for the RCI clinical master’s, and it opens the direct PhD route if you finish with 75% or a 7.5 CGPA. A three-year degree needs a bridge year, or the first year of a master’s.',
  },
  {
    group: 'Teaching',
    q: 'Should I do D.El.Ed first?',
    a: 'Only if primary teaching is the career you actually want. It is two full-time years and it does not stack with a regular BA. If psychology is the plan, do the BA first and decide about teaching later.',
  },
  {
    group: 'Teaching',
    q: 'Can I do D.El.Ed and a BA at the same time?',
    a: 'Practically, no. Both are full-time with attendance rules and internships. Distance psychology is closed. An evening college does not solve it either, because D.El.Ed requires full-time attendance.',
  },
  {
    group: 'Teaching',
    q: 'Can I do D.El.Ed in Uttar Pradesh after Class 12?',
    a: 'No. Uttar Pradesh requires a completed bachelor’s degree for D.El.Ed admission.',
  },
  {
    group: 'Teaching',
    q: 'Can I do D.El.Ed in Delhi after Class 12?',
    a: 'Yes. Delhi admits Class 12 students with 50% or more, up to age 24, through a 150-question computer-based test. It is a full two-year commitment, and it delays your degree.',
  },
  {
    group: 'Teaching',
    q: 'Is DPSE the same as D.El.Ed?',
    a: 'No. DPSE is for pre-school children, roughly ages three to six. It does not qualify you for CTET Paper I or a primary teaching post. D.El.Ed is the elementary route, classes one to five and up to class eight.',
  },
  {
    group: 'Teaching',
    q: 'How fast is a government teaching job, really?',
    a: 'Slower than the advice suggests. Delhi’s 2025 primary teacher advertisement had 1,169 posts after revision, and the selection process alone can take well over a year. Add the two-year diploma, and the shortcut is not short.',
  },
  {
    group: 'Teaching',
    q: 'What if I want to work with children but not teach?',
    a: 'School counsellor, educational psychologist, or child development specialist. That route needs the psychology BA and master’s, keeps you with children, and usually pays better than a primary teaching post.',
  },
  {
    group: 'Money and work',
    q: 'Can I legally earn money at 17?',
    a: 'Yes, in non-hazardous work, with limits on hours and no night shifts. Tutoring and freelance writing are the practical options. Formal platforms usually need you to be 18 for identity checks, and a contract signed by a minor is not enforceable, so a parent signs until you turn 18.',
  },
  {
    group: 'Money and work',
    q: 'How much can I realistically earn?',
    a: 'In the gap after boards, 4,000 to 10,000 rupees a month from tutoring. During college, 9,000 to 17,000 a month at eight to ten hours a week. More is possible, but it starts to cost you attendance and grades.',
  },
  {
    group: 'Money and work',
    q: 'Will working hurt my studies?',
    a: 'Only if you let it. Cap term-time work at about ten hours a week, protect your attendance, and pause during exams. A 7.5 CGPA is worth more to your future than an extra 3,000 rupees a month now.',
  },
  {
    group: 'After graduation',
    q: 'Do I need a PhD to be a psychologist?',
    a: 'Not to practise, if you have the RCI clinical master’s. You do need a PhD for academia, research posts, and most professor roles.',
  },
  {
    group: 'After graduation',
    q: 'Can I become a professor with a four-year BA?',
    a: 'Not directly. Assistant Professor posts need a master’s at 55% or more plus UGC NET or a PhD. The four-year degree lets you enter a PhD earlier if you finish with 75% or a 7.5 CGPA.',
  },
  {
    group: 'After graduation',
    q: 'Does a PhD guarantee a professor job?',
    a: 'No. It meets the minimum qualification. Permanent posts are limited, competitive, and subject to reservation rosters and interviews. Many people begin as guest or ad hoc lecturers.',
  },
  {
    group: 'After graduation',
    q: 'What is the UGC JRF, and is it worth it?',
    a: 'It is the top result in UGC NET. It pays 37,000 rupees a month for the first two years and 42,000 for the rest, plus contingency and house rent where applicable. It is the cleanest way to do a PhD without depending on family money. You cannot take outside paid work while you hold it.',
  },
];

export const GLOSSARY = [
  { term: 'RCI', def: 'Rehabilitation Council of India. The statutory body that regulates rehabilitation and clinical psychology training and keeps the register of licensed professionals.' },
  { term: 'CRR', def: 'Central Rehabilitation Register. The RCI register. Only people with an active CRR number can legally practise clinical or rehabilitation psychology.' },
  { term: 'NCAHP Act 2021', def: 'National Commission for Allied and Healthcare Professions Act. It defines recognised allied health qualifications as regular-mode degrees, which is why distance psychology is not recognised.' },
  { term: 'UGC', def: 'University Grants Commission. The regulator for higher education standards, fellowships, and degree rules.' },
  { term: 'NCTE', def: 'National Council for Teacher Education. The body that sets standards for D.El.Ed, B.Ed, and other teacher education programmes.' },
  { term: 'NEP 2020', def: 'National Education Policy 2020. The framework behind four-year undergraduate degrees, multiple exits, and the research year.' },
  { term: 'FYUP', def: 'Four-Year Undergraduate Programme. The NEP structure with eight semesters and an honours-with-research option.' },
  { term: 'CUET UG', def: 'Common University Entrance Test for undergraduate admission, run by the National Testing Agency.' },
  { term: 'CSAS', def: 'Common Seat Allocation System. Delhi University’s portal for programme and college preferences and seat allocation.' },
  { term: 'D.El.Ed', def: 'Diploma in Elementary Education. A two-year full-time teacher training diploma for primary and upper-primary classes.' },
  { term: 'DPSE', def: 'Diploma in Pre-School Education. A two-year diploma for nursery and preschool teaching, ages three to six.' },
  { term: 'B.El.Ed', def: 'Bachelor of Elementary Education. A four-year integrated elementary teacher education degree.' },
  { term: 'CTET', def: 'Central Teacher Eligibility Test. Paper I covers classes one to five. Passing it is required for many government teaching posts.' },
  { term: 'DSSSB', def: 'Delhi Subordinate Services Selection Board. It recruits teachers and other staff for Delhi government schools and local bodies.' },
  { term: 'PRT, TGT, PGT', def: 'Primary Teacher, Trained Graduate Teacher, and Post Graduate Teacher. The three main school teaching levels in India.' },
  { term: 'UGC NET', def: 'National Eligibility Test. It determines eligibility for Assistant Professor posts and PhD admission.' },
  { term: 'JRF', def: 'Junior Research Fellowship. The top NET result. It funds a PhD at 37,000 rupees a month for two years, then 42,000.' },
  { term: 'ODL', def: 'Open and Distance Learning. Psychology programmes in this mode lost UGC recognition from the July-August 2025 session.' },
  { term: 'M.Clin.Psy', def: 'Master in Clinical Psychology. The RCI’s two-year clinical qualification that replaced the M.Phil, with the new name approved in May 2026.' },
  { term: 'SEP', def: 'School Experience Programme. The supervised school placement that is part of D.El.Ed training.' },
];

export const SOURCES: Source[] = [
  {
    name: 'Public notice on psychology in ODL and online mode',
    org: 'University Grants Commission',
    date: '12 August 2025',
    url: 'https://ncahp.abdm.gov.in/Resources/ImpLetters/UGC%20NCAHP%20notification%20%20offering%20programmes%20in%20ODL%20and%20Online%20mode12Aug2025.pdf',
    settles: 'No institution may offer psychology in open, distance, or online mode from the July-August 2025 session. This is the source for the distance-degree warning.',
  },
  {
    name: 'M.A. Clinical Psychology guidelines and syllabus',
    org: 'Rehabilitation Council of India',
    date: '2025',
    url: 'https://cdnbbsr.s3waas.gov.in/s34f4eeef3a8c90dfceaddd5c6d64e4ebb/uploads/2025/07/2025070877238090.pdf',
    settles: 'The two-year clinical master’s, the 55% entry requirement, the four-year degree rule, and the bridge route for three-year graduates.',
  },
  {
    name: 'Office memorandum on course names',
    org: 'Rehabilitation Council of India',
    date: '3 May 2026',
    url: 'https://cdnbbsr.s3waas.gov.in/s34f4eeef3a8c90dfceaddd5c6d64e4ebb/uploads/2026/05/202605111585522882.pdf',
    settles: 'The approved names B.Clin.Psy, M.Clin.Psy, B.Rehab.Psy, and M.Rehab.Psy.',
  },
  {
    name: 'PhD regulations',
    org: 'University Grants Commission',
    date: '2022',
    url: 'https://www.ugc.gov.in/pdfnews/9713062_Ph.D.-Regulations-2022.pdf',
    settles: 'A four-year bachelor’s with research and a 7.5 CGPA can go directly to a PhD. This is why the fourth year matters.',
  },
  {
    name: 'CUET UG information bulletin',
    org: 'National Testing Agency',
    date: '2026',
    url: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf',
    settles: 'Up to five subjects, 50 questions per paper, five marks each, one mark negative, 60 minutes per paper.',
  },
  {
    name: 'Bulletin of information, undergraduate',
    org: 'University of Delhi',
    date: '2026-27',
    url: 'https://ihe.du.ac.in/wp-content/uploads/2026/01/BOI_UG_2026_27.pdf',
    settles: 'The rule that you must appear in CUET in the subjects you studied in Class 12, and how subject mapping works.',
  },
  {
    name: 'First round allocation scores',
    org: 'University of Delhi',
    date: '19 July 2025',
    url: 'https://admission.uod.ac.in/2025/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf',
    settles: 'The 2025 general-category scores quoted on this site for psychology colleges.',
  },
  {
    name: 'Admission brochure',
    org: 'Ambedkar University Delhi',
    date: '2026-27',
    url: 'https://aud.delhi.gov.in/sites/default/files/inline-files/admission_brochure_2026-27.pdf',
    settles: 'The 85% Delhi reservation, programme eligibility, seats, and fees.',
  },
  {
    name: 'University prospectus',
    org: 'Jamia Millia Islamia',
    date: '2026-27',
    url: 'https://admission.jmi.ac.in/application/assets/pdfFile/prospectus/UniversityProspectus/University_Prospectus_2026_2027.pdf',
    settles: 'The 42 psychology seats, the 13,475 rupee annual fee, the 50% eligibility, and the separate entrance test.',
  },
  {
    name: 'D.El.Ed prospectus',
    org: 'SCERT Delhi',
    date: '2026',
    url: 'https://cdnbbsr.s3waas.gov.in/s32596a54cdbb555cfd09cd5d991da0f55/uploads/2026/04/20260430132501407.pdf',
    settles: 'Class 12 entry at 50%, the age 24 limit, the 150-question test, and the 85% Delhi quota for D.El.Ed seats.',
  },
  {
    name: 'Advertisement 05/2025, Assistant Teacher (Primary)',
    org: 'Delhi Subordinate Services Selection Board',
    date: '10 September 2025',
    url: 'https://dsssb.delhi.gov.in/dsssb-vacancies',
    settles: 'The 1,180 advertised primary teacher posts, later revised to 1,169, and the pay level 6 scale.',
  },
  {
    name: 'Junior Research Fellowship scheme',
    org: 'University Grants Commission',
    date: 'Current rates',
    url: 'https://www.ugc.gov.in/Fellowship/stu_Fellowship1',
    settles: 'The JRF rate of 37,000 rupees a month for two years and 42,000 for the remaining tenure, plus contingency.',
  },
  {
    name: 'Child and Adolescent Labour (Prohibition and Regulation) Act, 1986',
    org: 'Government of India',
    date: 'As amended',
    url: 'https://www.indiacode.nic.in',
    settles: 'The rules on adolescents working: non-hazardous work only, with limits on hours and no night shifts.',
  },
  {
    name: 'National Education Policy 2020',
    org: 'Ministry of Education',
    date: '2020',
    url: 'https://static.pib.gov.in/WriteReadData/userfiles/NEP_Final_English_0.pdf',
    settles: 'The four-year undergraduate structure and the multiple-entry, multiple-exit framework.',
  },
];

export const MOVES = [
  {
    n: '1',
    title: 'Pick four years, not three',
    body: 'A four-year BA with research is what makes the RCI clinical master’s and the direct PhD route available. It is the single highest-value decision on this page.',
  },
  {
    n: '2',
    title: 'Keep teaching and psychology apart for now',
    body: 'Both are full-time. Doing D.El.Ed first to "keep options open" usually closes the psychology door for two years and adds a detour.',
  },
  {
    n: '3',
    title: 'Start earning with tutoring, not a job',
    body: 'Tutoring is legal at 17, needs no capital, and fits around school and college. A formal job does not fit around a full-time degree.',
  },
];
