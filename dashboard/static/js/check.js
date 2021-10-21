ok_img = "static/images/ok.png"
no_img = "static/images/no.png"
wait_img = "static/images/wait.png"

/*
    # visualiser microservice
    """
    1. Collector:4321
    2. Database:5432
    3. Visualiser:8080
    """
    # Recommender microservice
    """
    4. Collector:2111
    5. Database:2311:5432
    6. Recommender:2211
    7. Webpage:2411
    """
    # Tag prediction microservice
    """
    8. Preprocessor:3111
    9. Database:3411:5432
    10. Tag Predictor:3211
    11. Webpage:3311
    """
*/

function check_service(id){
    img_id = id.toString()+"-img"
    change_img(img_id, wait_img)
    setTimeout(function() {
        check_status(id, get_url(id.toString()))
    }, 400);
}


function change_img(id ,img){
    return document.getElementById(id).src = img
}

function get_url(id){
    switch(id){
        case "1":
            return "http://localhost:4321/api/check-status"
        case "2":
            return "/status2"
        case "3":
            return "http://localhost:8080/api/check-status"
        case "4":
            return "http://localhost:2111/api/check-status"
        case "5":
            return "/status5"
        case "6":
            return "http://localhost:2211/api/check-status"
        case "7":
            return "http://localhost:2411/api/check-status"
        case "8":
            return "http://localhost:3111/api/check-status"
        case "9":
            return "/status9"
        case "10":
            return "http://localhost:3211/api/check-status"
        case "11":
            return "http://localhost:3311/api/check-status"
    }
}

function check_status(id, url)
{
    const img_id = id.toString()+"-img"
    fetch(url).then(response => response.json()).then(res => {
    console.log("Request complete! response:", res.status);
    if(res.status == "success"){ 
        change_img(img_id, ok_img)
    }else{
        change_img(img_id, no_img)
    }
    }).catch((error) => {
        console.log(error)
        change_img(img_id, no_img)
    })
}


function onload_check(){
    const services = [1,2,3,4,5,6,7,8,9,10,11]
    services.forEach(function(item, i){
        check_service(item)
    })
}