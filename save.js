export function saveScore(name, score){
    /**
     * Save the score in the localStorage to display it later
     */
    if(window.localStorage.getItem("score")==null){
        console.log("There is no localStorage, creating one...");
        var data = [{"name":name, "score":score}];
        window.localStorage.setItem("score", JSON.stringify(data));
    }
    else{
        console.log("There is a local storage, adding an entry...");
        var data = JSON.parse(window.localStorage.getItem("score"));
        data.push({"name":name, "score":score});
        window.localStorage.setItem("score", JSON.stringify(data));
    }
    console.log(window.localStorage.getItem("score"));
}

export function getScoreList(){
    /**
     * Get the score list and return an array of score
     */

    var data = window.localStorage.getItem("score");
    if(data==null)
        return [];
    else{
        data = JSON.parse(data);
        var array_score = [];
        for(var i=0;i<data.length;i++)
            array_score.push(data[i].name+" : "+data[i].score);
        return array_score;
    }
}