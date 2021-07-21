

function checkTime(){
    let date = document.getElementById('checkin-date').value
    // alert(date)
    console.log("date>>",date)
    $.ajax({
        url:'/users/check/'+date,
        type:'POST',
    //     success : function(data){
           
            
    //         $('#doc').empty();
    //         for(i=0;i<data.length;i++){
    //             $('#doc').append(`<option value="${data[i].fname} ${data[i].lname}">${data[i].fname} ${data[i].lname}</option>`)
               
    //         }
            
           
    //     }
    })
}