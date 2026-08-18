// Simple page animation

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});

        // كود تفعيل التخزين الخارجي الذكي
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('تم تسجيل نظام التشغيل بدون نت بنجاح!'))
                    .catch(err => console.log('فشل التسجيل:', err));
            });
        }
const CACHE_NAME = 'my-offline-site-v1';
// ضع هنا كل الملفات التي تريد للموقع أن يحفظها ليعمل بدون نت
const ASSETS_TO_CACHE = [
    'index.html',
    'manifest.json'
];

// تثبيت الملفات داخل جهاز المستخدم
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// تفعيل النظام
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// عرض الملفات المخزنة مباشرة إذا كان المستخدم غير متصل بالإنترنت
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // إذا كان الملف مخزن، افتحه فوراً
            }
            return fetch(event.request); // إذا لم يكن مخزن وجد نت، احلبه من السيرفر
        })
    );
});
