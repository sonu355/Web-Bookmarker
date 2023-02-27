
    /*
    localStorage.setItem('key','Hello')
    console.log(localStorage.getItem('key'))
    localStorage.removeItem('key')
    console.log(localStorage.getItem('key'))
    */
document.getElementById('myform').addEventListener('submit',saveBookMark)

function saveBookMark(event){
    var siteName = document.getElementById('siteName').value 
    var siteUrl = document.getElementById('siteURL').value
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookMark = { 
        name : siteName,
        url : siteUrl
    }
    console.log(bookMark)

    if(localStorage.getItem('bookmark') === null){
        //initiate an array
        var bookmarks = []
        //add objects to array
        bookmarks.push(bookMark)
        //set array in localstorage
        localStorage.setItem('bookmark', JSON.stringify(bookmarks))
    }else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmark'))
        bookmarks.push(bookMark)
        localStorage.setItem('bookmark', JSON.stringify(bookmarks))
        console.log(localStorage.getItem('bookmark'))
    }
    showBookMarks()
    document.getElementById('myform').reset()
    event.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmark'))

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmark', JSON.stringify(bookmarks))
    showBookMarks()
}
function showBookMarks(){
    var bookMark = JSON.parse(localStorage.getItem('bookmark'))
    console.log(bookMark)
    var bookMarkResults = document.getElementById('booksresults')
    bookMarkResults.innerHTML = ''
    for(var i = 0; i < bookMark.length; i++){
        var name = bookMark[i].name
        var url = bookMark[i].url

        bookMarkResults.innerHTML += '<div class="well">'+
                                   '<h3>'+name+
                                   '<a class="btn btn-success" target="_blank" href="'+url+'">Visit</a>' +
                                   '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                   '</h3>'+
                                   '</div>';
    }
}

function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('please fill all details')
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('please use valid Url')
        return false
    }
    return true
}