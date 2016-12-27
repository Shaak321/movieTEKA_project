function ajaxDelete(id) {
    var $delete_Btn = $('#delete')
    $delete_Btn.on('click', function(ev) {
        ev.preventDefault()
            const headers = {
            'csrf-token': $('[name="_csrf"]').val()
            }
            
            return Promise.resolve(
                $.ajax({
                url: `/ajax/delete/${id}`,
                method: 'DELETE',
                dataType: 'json',
                headers
                }).done(function(json){
                    if(json.success){
                        location.assign('/allMovies')
                    }else{
                        alert('Some error happened');     
                    }
                })
            )
    }
    )}