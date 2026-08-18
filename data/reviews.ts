export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  neighborhood: string;
  rating: number;
  date: string;
  serviceUsed: string;
  comment: string;
  verified: boolean;
  avatarSeed: string;
}

export const SAUDI_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'أبو فهد العتيبي',
    city: 'الرياض',
    neighborhood: 'حي الملقا',
    rating: 5,
    date: 'قبل 3 أيام',
    serviceUsed: 'مكافحة النمل الأبيض (الأرضة) وحقن الأبواب',
    comment: 'ما شاء الله تبارك الله، عمل احترافي جداً ومواعيد بالدقيقة. كان عندي إصابة أرضة في أبواب الفيلا والباركيه، نفذوا حقناً نظيفاً دون أي تكسير أو تشويه وسلموني سند ضمان 15 سنة موثق بالفاتورة. أنصح بالتعامل معهم وبقوة.',
    verified: true,
    avatarSeed: 'fahad'
  },
  {
    id: 'rev-2',
    author: 'م. خالد الغامدي',
    city: 'جدة',
    neighborhood: 'حي الشاطئ',
    rating: 5,
    date: 'قبل أسبوع',
    serviceUsed: 'إبادة الصراصير والجل الألماني للمطبخ',
    comment: 'عانيت شهوراً من صراصير المطبخ الصغيرة واستخدمت منتجات عادية وما فادت. تواصلت مع مؤسسة حصن المملكة وحضر الفني في أقل من نصف ساعة وطبق جل ألماني ومبيد بدون أي رائحة وما احتجنا نخرج من البيت. اختفت تماماً ولله الحمد.',
    verified: true,
    avatarSeed: 'khaled'
  },
  {
    id: 'rev-3',
    author: 'د. سارة القحطاني',
    city: 'الخبر',
    neighborhood: 'الحزام الذهبي',
    rating: 5,
    date: 'قبل أسبوعين',
    serviceUsed: 'القضاء على بق الفراش بالحرارة والضباب',
    comment: 'خدمة راقية جداً وأجهزة حديثة بالبخار 180 درجة ومبيدات آمنة. رجعوا بعد أسبوعين فحصوا وتأكدوا مجاناً. الراحة النفسية رجعت للبيت شكراً لفريق حصن المملكة.',
    verified: true,
    avatarSeed: 'sarah'
  },
  {
    id: 'rev-4',
    author: 'عبدالمحسن الدوسري',
    city: 'الدمام',
    neighborhood: 'حي الفاخرية',
    rating: 5,
    date: 'قبل أسبوعين',
    serviceUsed: 'باقة الدرع الذهبي الشامل للفيلا والحوش',
    comment: 'رشوا الفيلا من الداخل والخارج والحوش والبيارات، والمبيد بدون رائحة تماماً وآمن على أطفالي. الضمان الذهبي معهم ممتاز وموثق برقم رسمي.',
    verified: true,
    avatarSeed: 'mohsen'
  },
  {
    id: 'rev-5',
    author: 'أ. سلطان الحربي (مدير تشغيل مطاعم)',
    city: 'مكة المكرمة',
    neighborhood: 'حي العزيزية',
    rating: 5,
    date: 'قبل شهر',
    serviceUsed: 'عقد الامتثال الصحي الدوري للمنشآت والمطاعم',
    comment: 'متعاقدون معهم لسلسلة مطابخ ومطاعم في مكة وجدة. تقاريرهم الدورية دقيقة والمصائد والمحطات مرقمة، واجتزنا التفتيش والرقابة الصحية بدرجة امتياز بدون أي ملاحظة.',
    verified: true,
    avatarSeed: 'sultan'
  },
  {
    id: 'rev-6',
    author: 'عبدالله الشهري',
    city: 'أبها',
    neighborhood: 'حي المنسك',
    rating: 5,
    date: 'قبل شهر',
    serviceUsed: 'طرد الحمام وتركيب شبك ستانلس ستيل',
    comment: 'ركبوا طارد حمام وشبكاً للنوافذ والمكيفات، الشغل متقن والحديد أصلي ستانلس ستيل ما يصدأ والواجهة رجعت نظيفة بدون إزعاج الطيور.',
    verified: true,
    avatarSeed: 'shehri'
  },
  {
    id: 'rev-7',
    author: 'م. فايز العنزي',
    city: 'تبوك',
    neighborhood: 'حي المروج',
    rating: 5,
    date: 'قبل شهر',
    serviceUsed: 'مكافحة العقارب وتأمين المزرعة',
    comment: 'عملوا حزاماً كيميائياً طارداً حول استراحتنا في تبوك ورشوا الأحواش. فنيون فاهمون وعندهم أدوات كشف UV ليلية احترافية.',
    verified: true,
    avatarSeed: 'faiz'
  },
  {
    id: 'rev-8',
    author: 'أحمد التميمي',
    city: 'القصيم',
    neighborhood: 'حي الصفراء، بريدة',
    rating: 5,
    date: 'قبل شهر ونصف',
    serviceUsed: 'تدفين النمل الأبيض قبل صبة النظافة',
    comment: 'عملنا معهم رش وتدفين الأرض قبل صبة النظافة لمشروع 4 فلل. التزموا بالمواعيد وأعطونا شهادة رسمية وضمان 15 سنة وسعرهم منافس جداً لمبيد بايفلكس الأصلي.',
    verified: true,
    avatarSeed: 'tamimi'
  }
];
