$(() => {

    //start here
    console.log('hello world');


    eraGenerator = (userInput) => {
      const $div = $('<div>').addClass('periods').appendTo('.left-sidebar')
      const $h3 = $('<h3>').text('CONTEMPORANEOUS ARCHITECTURAL STYLES').appendTo($div)
      const $h4 = $('<h4>').addClass('styles')
      $h4.text('Year: ' + userInput)
      $('.periods').append($h4)
      if (userInput >= 1800 && userInput <= 1829) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Queen Anne, Gothic Revival, Second Empire')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1830 && userInput <= 1860) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Greek Revival, Gothic Revival, Italianate, Exotic Revival, Egyptian Revival, Moorish Revival, Swiss Chalet, Octagon Mode')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1861 && userInput <= 1890) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('International, Post-Modern Eclectic')
        $('.periods').append(architectureEra)
      }
    }



    $('form').on('submit', (event) => {
      event.preventDefault()
      $('.landmarks').remove()
      $('.periods').remove()
      $('.info-items').remove()
      const userInput = $('input[type="text"]').val()

    $.ajax(
      {
        url: 'https://data.cityofchicago.org/resource/tdab-kixi.json'
      }
    ).then(
      (data) => {
        eraGenerator(userInput)
        const $div = $('<div>').addClass('landmarks').prependTo('.left-sidebar')
        const $h3 = $('<h3>').text('HISTORICAL LANDMARKS BUILT IN ' + userInput).appendTo($div)
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
          $('.info-items').remove()
          const landmarkListItem = $(event.currentTarget).attr('id')
          const $h3 = $('<h3>').text(data[landmarkListItem].landmark_name).addClass('info-items')
          const $h4 = $('<h4>').text(data[landmarkListItem].address).addClass('info-items')
          const $anotherh4 = $('<h4>').text('Architect: ' + data[landmarkListItem].architect).addClass('info-items')
          const $seeMoreLink = $('<h4>').text('See more').attr('id', 'seemore').addClass('info-items')
          $('.info').append($h3)
          $('.info').append($h4)
          $('.info').append($anotherh4)
          $('.info').append($seeMoreLink)
          $('#seemore').on('click', (event) => {
            $('iframe').css('visibility', 'visible')
          })
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
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
