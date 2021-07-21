
function getDoctor(){
    let deptid = document.getElementById('dept').value
    // console.log("id>>",deptid)
    $.ajax({
        url:'/users/getdoctor/'+deptid,
        type:'POST',
        success : function(data){
           
            // $('#doc').remove().end().append(`<option value="">
            //                            SELECT
            //                       </option>`);
            // $('#doc').val(false);
            // $('#doc').clear()
            $('#doc').empty();
            for(i=0;i<data.length;i++){
                $('#doc').append(`<option value="${data[i].fname} ${data[i].lname}">${data[i].fname} ${data[i].lname}</option>`)
                // $('#doc').clear()
                // console.log("ajax data>>>>",datas[i].doctor)
                // $('#doc').html(datas[i].doctor)
                // $('#doc').prop('selectedIndex',-1).trigger( "change" );
                // .trigger( "change" );
            }
            
            // $('#doc').clear().end()
        }
    })
}