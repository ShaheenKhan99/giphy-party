const $searchInput = $('#search');
const $gifImgDiv = $('#gifarea');

// use the result from the async function to add a gif
function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randIdx = Math.floor(Math.random() * numResults);
    let $newCol = $('<div>', { class: "col-md-4 col-12 mb-4"});
    let $newGif = $('<img>', {
      src: res.data[randIdx].images.original.url,
      class: "w-100 h-100"
    });
    $newCol.append($newGif);
    $gifImgDiv.append($newCol);
  }
}

//handle form submission, clear search box and make ajax call
$('form').on('submit', async function(e){
  e.preventDefault();
  let searchTerm = $searchInput.val();
  $searchInput.val('');
  const res = await axios.get('http://api.giphy.com/v1/gifs/search', 
        { params: { q: searchTerm, 
                    api_key: 'MZx97pG7gkQ6a09OBgEhTDFalr15mgNv'
                  } 
                });
  addGif(res.data);  
});

// remove gif
$('#remove').on('click', function(){
  $gifImgDiv.empty();
});