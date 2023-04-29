const redis = require ("redis")
const fs = require("fs")
const client = redis.createClient()




client.on("error", error =>{
    console.log(error)
})

//kendini çağıran fonks
;(async ()=>{
    await client.connect() //cliente bağlandı
    client.subscribe("upload", upload) //upload kanalına abone oldum
})() 

//her upload eventi geldiğinde bu fonksiyon calısacak
function upload (filedata){
        // filedata string olarak geldiği için json objesine çevrildi
        const file = JSON.parse(filedata) 
        //dosyayı dowloads klasörüne kaydettim
        fs.writeFileSync("dowloads/"+file.name, Buffer.from(file.data)) 
}



