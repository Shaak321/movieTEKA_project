function ajaxReturn(id) {
    var $delete_Btn = $('#return')
    $delete_Btn.on('click', function(ev) {
        ev.preventDefault()
            const headers = {
            'csrf-token': $('[name="_csrf"]').val()
            }
            
            return Promise.resolve(
                $.ajax({
                url: `/ajax/rentInfo/${id}`,
                method: 'DELETE',
                dataType: 'json',
                headers
                }).done(function(json){
                    if(json.success){
                        location.assign('/ownRents')
                    }else{
                        alert('Some error happened');     
                    }
                })
            )
}
    )}