$(() => {

    //start here

    let currentYear = 2020
    let currentImgIndex = 0





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
        if (userInput > currentYear) {
          console.log('nope');
          $('body').empty()
          const $div = $('<div>').addClass('future').appendTo('body')
          const $h2 = $('<h2>').text('We haven\'t made it to ' + userInput + ' yet. But here\'s what it might look like:').appendTo('.future')
          const $anotherdiv = $('<div>').addClass('future-image-container').appendTo($div)
          const $img = $('<img>').attr('src', 'images/future1.jpg').addClass('future-images').appendTo('.future-image-container')
          const $img2 = $('<img>').attr('src', 'images/future2.jpg').addClass('future-images').appendTo('.future-image-container')
          const $img3 = $('<img>').attr('src', 'images/future3.jpg').addClass('future-images').appendTo('.future-image-container')
          const $numOfFutureImages = $('.future-image-container').children().length - 1
          console.log($numOfFutureImages);
          const $nextButton = $('<button>').attr('id', 'next-button').addClass('carouselButton')
          const $previousButton = $('<button>').attr('id', 'previous-button').addClass('carouselButton')
          $nextButton.appendTo('.future')
          $previousButton.appendTo('.future')
          console.log($numOfFutureImages);

          $('#next-button').on('click', () => {
            $('.future-image-container').children().eq(currentImgIndex).css('display', 'none')
            if (currentImgIndex < $numOfFutureImages) {
              currentImgIndex ++
            }
            else {
              currentImgIndex = 0
            }
            $('.future-image-container').children().eq(currentImgIndex).css('display', 'block')
          })


          $('#previous-button').on('click', () => {
            $('.future-image-container').children().eq(currentImgIndex).css('display', 'none')
            if (currentImgIndex > 0) {
              currentImgIndex --
            }
            else {
              currentImgIndex = $numOfFutureImages
            }
            $('.future-image-container').children().eq(currentImgIndex).css('display', 'block')
          })
          //button that says yikes! let me return to the present

        }
        else if (userInput < 1800) {
          console.log('also no');
        }
        else {
          eraGenerator(userInput)
          const $div = $('<div>').addClass('landmarks').prependTo('.left-sidebar')
          const $h3 = $('<h3>').text('HISTORICAL LANDMARKS BUILT IN ' + userInput).appendTo($div)
          for (let i = 0; i < data.length; i++) {
            if (data[i].date_built === userInput) {
              const $h4 = $('<h4>')
              $h4.text(data[i].landmark_name).attr('id', i).addClass('landmark-list')
              $('.landmarks').append($h4)
            }
          }
          $('.landmark-list').on('click', (event) => {
            $('.info').remove()
            const $div = $('<div>').addClass('info').appendTo('.right-sidebar')
            const $firsth3 = $('<h3>').text('DESCRIPTION OF THE LANDMARK').appendTo('.info')
            const landmarkListItem = $(event.currentTarget).attr('id')
            const $h5 = $('<h5>').text(data[landmarkListItem].landmark_name).addClass('info-items')
            const $h4 = $('<h4>').text(data[landmarkListItem].address).addClass('info-items')
            const $anotherh4 = $('<h4>').text('Architect: ' + data[landmarkListItem].architect).addClass('info-items')
            const $seeMoreLink = $('<h4>').text('See more').attr('id', 'seemore').addClass('info-items')
            $('.info').append($h5)
            $('.info').append($h4)
            $('.info').append($anotherh4)
            $('.info').append($seeMoreLink)
            $('#seemore').on('click', (event) => {
              const $div = $('<div>').addClass('see-more').appendTo('.right-sidebar')
              const $h3 = $('<h3>').text('EXTRA INFO ABOUT THE LANDMARK').appendTo('.see-more')
              const $iframe = $('<iframe>').attr('id', 'wiki-iframe').attr('width', '100%').attr('height', '400').attr('src', 'https://en.wikipedia.org/wiki/Emil_Bach_House')
              $iframe.appendTo('.see-more')
              $('#wiki-iframe').css('visibility', 'visible')
            })
          })
        }
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
