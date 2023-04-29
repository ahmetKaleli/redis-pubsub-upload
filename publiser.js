 const redis = require ("redis")
const fs = require("fs")
 const client = redis.createClient()
   
// client.on("error", error =>{
//     console.log(error)
// })

// client.publish("test", "app den gelen", (e, number)=>{
//     console.log(`mesaj ${number} kişiye gönderildi`)
// })

async function pub (name ){
    await client.connect() // redis istemcisine bağlandım
    
    const file = {} // boş bir file objsei olustu 
    file.name=/(?<filename>\w+\.\w+$)/.exec(name).groups.filename //file objesine ortam değişkenşnden dosya dını ayıkladım
    file.mime=/(?<=\.)(?<mime>\w+)/.exec(file.name).groups.mime // dosya adından dosya tipini ayıkladım
    file.data=fs.readFileSync(name) // dosyayı okuyuo dataya attım

    client.publish("upload", JSON.stringify(file)) //dosya objesini stringe çevirip gönderdim
} 
pub (process.env.FILE) //ortam değikneninden dosaynın yolunu parametre olarak verdim