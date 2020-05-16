$(() => {

    //start here
    console.log('hello world');


    eraGenerator = (userInput) => {
      const $h3 = $('<h3>')
      $h3.text('Architectural styles of: ' + userInput)
      $('.periods').append($h3)
      if (userInput >= 1800 && userInput <= 1829) {
        const architectureEra = $('<h3>')
        architectureEra.text('Queen Anne, Gothic Revival, Second Empire')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1830 && userInput <= 1860) {
        const architectureEra = $('<h3>')
        architectureEra.text('Greek Revival, Gothic Revival, Italianate, Exotic Revival, Egyptian Revival, Moorish Revival, Swiss Chalet, Octagon Mode')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1861 && userInput <= 1890) {
        const architectureEra = $('<h3>')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h3>')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h3>')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
    }



    $('form').on('submit', (event) => {
    event.preventDefault()
    const userInput = $('input[type="text"]').val()

    $.ajax(
      {
        url: 'https://data.cityofchicago.org/resource/tdab-kixi.json'
      }
    ).then(
      (data) => {
        eraGenerator(userInput)
        for (let i = 0; i < data.length; i++) {
          if (data[i].date_built === userInput) {
            const $paragraph = $('<p>')
            $paragraph.text(data[i].landmark_name).attr('id', i).addClass('landmark-list')
            $('.landmarks').append($paragraph)
          }
          else {
            // console.log('hi');
          }
        }
        $('.landmark-list').on('click', (event) => {
          const landmarkListItem = $(event.currentTarget).attr('id')
          console.log(landmarkListItem);
          const $h3 = $('<h3>').text(data[landmarkListItem].landmark_name)
          const $h4 = $('<h4>').text(data[landmarkListItem].address)
          const $anotherh4 = $('<h4>').text('Architect: ' + data[landmarkListItem].architect)
          $('.info').append($h3)
          $('.info').append($h4)
          $('.info').append($anotherh4)
        })
      },
      (error) => {
        console.log(error);
      }
    )
  })







    //end here

})


//References:
//http://www.phmc.state.pa.us/portal/communities/architecture/styles/mid-19th-century.html
