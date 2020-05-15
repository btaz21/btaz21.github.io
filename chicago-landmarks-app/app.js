$(() => {

    //start here
    console.log('hello world');

    $('form').on('submit', (event) => {
    event.preventDefault()
    const userInput = $('input[type="text"]').val()

    $.ajax(
      {
        url: 'https://data.cityofchicago.org/resource/tdab-kixi.json'
      }
    ).then(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].date_built === userInput) {
            const $paragraph = $('<p>')
            $paragraph.text(data[i].landmark_name)
            $('.landmarks').append($paragraph)
          }
        }
      },
      (error) => {
        console.log(error);
      }
    )
  })







    //end here

})
