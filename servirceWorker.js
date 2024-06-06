const staticPage="dev-user-site-v1"
const assets=[
    "/",
    "/index.html",
    "/style.css",
    "/index.js"
]
self.addEventListener("install",(installEvent)=>{
    installEvent.waitUntil(
    caches.open(staticPage).then((cache)=>{
        cache.addAll(assets);

    })
    );
})
self.addEventListener("fetch",(fetchEvent)=>{
    fetchEvent.respondWhitch(
        caches.match(fetchEvent.request)
        .then((response)=>{
            return response || fetch(fetchEvent.request);
        })
    )
});

if("servirceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((res)=>console.log("serviceWorker registrado"))
        .catch((err)=>console.log("servidor no registrado"))
    })
}