export function saveScore(name, score){
    document.cookie = "";
    if(document.cookie==""){
        console.log("Cookie doesn't exist, creating the cookie...");
        var cookiedata = [{"name":name, "score":score}];
        document.cookie = "score="+JSON.stringify(cookiedata)+";"+" expires=Wed, 31 Dec 2025 23:59:59 GMT";
    }
    else{
        console.log("Cookie already exist adding an entry");
    }
    console.log(document.cookie)
}

export function getScoreList(){

}