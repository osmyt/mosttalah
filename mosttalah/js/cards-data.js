// Cards data - Technical terms database
const cardsData = [
    {
        title: "علم التعمية",
        englishTerm: "Cryptography",
        description: "علم حماية المعلومات من خلال تحويلها إلى رموز غير مفهومة.",
        tags: ["علم", "التعمية", "معلومات"]
    },
    {
        title: "الذكاء الاصطناعي",
        englishTerm: "Artificial Intelligence",
        description: "تقنية تمكن الحواسيب من محاكاة الذكاء البشري والتعلم من البيانات",
        tags: ["تقنية", "تعلم آلي"]
    },
    {
        title: "التعلم الآلي",
        englishTerm: "Machine Learning",
        description: "فرع من الذكاء الاصطناعي يركز على تطوير خوارزميات تتعلم من البيانات",
        tags: ["ذكاء اصطناعي", "بيانات"]
    },
    {
        title: "البيانات الضخمة",
        englishTerm: "Big Data",
        description: "مجموعات ضخمة من البيانات التي تتطلب تقنيات خاصة للتحليل والتخزين",
        tags: ["بيانات", "تحليل"]
    },
    {
        title: "سلسلة الكتل",
        englishTerm: "Blockchain",
        description: "تقنية لتخزين البيانات بشكل آمن وموزع عبر شبكة من الحواسيب",
        tags: ["أمان", "عملات رقمية"]
    },
    {
        title: "الحوسبة السحابية",
        englishTerm: "Cloud Computing",
        description: "تقديم خدمات الحوسبة عبر الإنترنت بدلاً من الأجهزة المحلية",
        tags: ["تقنية", "خدمات"]
    },
    {
        title: "إنترنت الأشياء",
        englishTerm: "Internet of Things",
        description: "شبكة من الأجهزة المتصلة التي تتبادل البيانات عبر الإنترنت",
        tags: ["تقنية", "أجهزة"]
    },
    {
        title: "الواقع المعزز",
        englishTerm: "Augmented Reality",
        description: "تقنية تدمج المعلومات الرقمية مع العالم الحقيقي",
        tags: ["تقنية", "واقع افتراضي"]
    },
    {
        title: "الواقع الافتراضي",
        englishTerm: "Virtual Reality",
        description: "بيئة رقمية ثلاثية الأبعاد يمكن التفاعل معها",
        tags: ["تقنية", "واقع معزز"]
    },
    {
        title: "التطبيقات المتنقلة",
        englishTerm: "Mobile Apps",
        description: "برامج مصممة للعمل على الهواتف الذكية والأجهزة اللوحية",
        tags: ["برمجة", "هواتف"]
    },
    {
        title: "قواعد البيانات",
        englishTerm: "Database",
        description: "نظام منظم لتخزين وإدارة واسترجاع البيانات",
        tags: ["بيانات", "برمجة"]
    },
    {
        title: "البرمجة الشيئية",
        englishTerm: "Object-Oriented Programming",
        description: "نمط برمجي يعتمد على تنظيم الكود في كائنات تحتوي على بيانات ووظائف",
        tags: ["برمجة", "كائنات", "تطوير"]
    },
    {
        title: "الذكاء الاصطناعي الضعيف",
        englishTerm: "Weak AI",
        description: "أنظمة ذكاء اصطناعي مصممة لمهام محددة وضيقة النطاق",
        tags: ["ذكاء اصطناعي", "أنظمة", "مهام محددة"]
    },
    {
        title: "التشفير المتماثل",
        englishTerm: "Symmetric Encryption",
        description: "طريقة تشفير تستخدم نفس المفتاح للتشفير وفك التشفير",
        tags: ["تشفير", "أمان", "مفاتيح"]
    },
    {
        title: "التشفير غير المتماثل",
        englishTerm: "Asymmetric Encryption",
        description: "طريقة تشفير تستخدم مفتاحين مختلفين للتشفير وفك التشفير",
        tags: ["تشفير", "أمان", "مفاتيح"]
    },
    {
        title: "الذكاء الاصطناعي القوي",
        englishTerm: "Strong AI",
        description: "أنظمة ذكاء اصطناعي قادرة على أداء أي مهمة فكرية يمكن للإنسان أداؤها",
        tags: ["ذكاء اصطناعي", "أنظمة", "ذكاء عام"]
    },
    {
        title: "البرمجة الوظيفية",
        englishTerm: "Functional Programming",
        description: "نمط برمجي يعتمد على استخدام الدوال الرياضية في كتابة البرامج",
        tags: ["برمجة", "دوال", "رياضيات"]
    },
    {
        title: "الذكاء الاصطناعي العام",
        englishTerm: "General AI",
        description: "أنظمة ذكاء اصطناعي قادرة على فهم وتطبيق المعرفة في مجالات متعددة",
        tags: ["ذكاء اصطناعي", "أنظمة", "ذكاء عام"]
    },
    {
        title: "التعلم العميق",
        englishTerm: "Deep Learning",
        description: "فرع من التعلم الآلي يستخدم شبكات عصبية متعددة الطبقات",
        tags: ["تعلم آلي", "شبكات عصبية", "ذكاء اصطناعي"]
    },
    {
        title: "الشبكات العصبية",
        englishTerm: "Neural Networks",
        description: "أنظمة محاكاة للدماغ البشري تستخدم في التعلم الآلي والذكاء الاصطناعي",
        tags: ["تعلم آلي", "ذكاء اصطناعي", "دماغ"]
    }
]; 