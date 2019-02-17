$(function () {
    $('#follower-form').submit(function (event) {
        event.preventDefault(); // Stops browser from navigating away from page
        var data;
        console.log(account.value);
        data = {account : account.value};
        console.log(data)
        // build a json object or do something with the form, store in data
        $.post('/follower', data, function (resp) {
            // alert(resp);
            // do something when it was successful
            $('#results').html(resp);
        });
    });
});