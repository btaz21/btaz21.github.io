$(() => {

    //start here

    //some global variable declarations
    let currentYear = 2020
    let currentImgIndex = 0



    eraGenerator = (userInput) => {
      const $div = $('<div>').addClass('periods').appendTo('.left-sidebar')
      const $h3 = $('<h3>').text('Contemporaneous Architectural Styles').appendTo($div)
      const $h4 = $('<h4>').addClass('styles')
      $h4.text('c.' + userInput).attr('id', 'year')
      $('.periods').append($h4)
      if (userInput >= 1800 && userInput <= 1829) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Early Republic Period, Federal Style, Classical Revival, Roman Classical Revival, Greek Revival')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1830 && userInput <= 1860) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Greek Revival, Gothic Revival')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1861 && userInput <= 1890) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Italianate Villa/Italianate, Octagon Style, Late Victorian, Romanesque Revival, Second Empire/Mansard Style, High Victorian Gothic, Chateauesque Style, Stick Style, Queen Anne, Shingle Style, Colonial Revival')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Sullivanesque, Commercial Style, Bungalow/Craftsman, Prairie School, Colonial Revival, Tudor Revival, Collegiate Gothic, Italian Renaissance Revival, Classical Revival, Beaux Arts')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1920 && userInput <= currentYear) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Spanish Colonial Revival, Art Deco, Moderne, International')
        $('.periods').append(architectureEra)
      }
    }


    //where the app begins
    $('form').on('submit', (event) => {
      event.preventDefault()
      $('.about-container').remove()
      $('.landmarks').remove()
      $('.periods').remove()
      $('.info').remove()
      $('.see-more').remove()
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
          const $nextButton = $('<button>').attr('id', 'next-button').addClass('carouselButton').text('>')
          const $previousButton = $('<button>').attr('id', 'previous-button').addClass('carouselButton').text('<')
          const $returnButton = $('<button>').attr('id', 'return').text('Yikes! Get Me Out of Here!')
          $nextButton.appendTo('.future-image-container')
          $previousButton.appendTo('.future-image-container')
          $returnButton.appendTo('.future')
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
          const $h3 = $('<h3>').text('Historical Landmarks Built in ' + userInput).appendTo($div)
          for (let i = 0; i < data.length; i++) {
            if (data[i].date_built === userInput) {
              const $h4 = $('<h4>')
              $h4.text(data[i].landmark_name).attr('id', i).addClass('landmark-list')
              $('.landmarks').append($h4)
            }
          }
          $('.landmark-list').on('click', (event) => {
            $('.info').remove()
            $('.see-more').remove()
            const $div = $('<div>').addClass('info').appendTo('.right-sidebar')
            const $firsth3 = $('<h3>').text('DESCRIPTION OF THE LANDMARK').appendTo('.info')
            const landmarkListItem = $(event.currentTarget).attr('id')
            const $h5 = $('<h5>').text(data[landmarkListItem].landmark_name).addClass('info-items')
            const $h4 = $('<h4>').text(data[landmarkListItem].address).addClass('info-items')
            const $anotherh4 = $('<h4>').text('Architect: ' + data[landmarkListItem].architect).addClass('info-items')
            const $seeMoreLink = $('<h4>').text('See more').attr('id', 'seemore').addClass('info-items')
            let $dateDesignated = $('<h4>').text(data[landmarkListItem].landmark_designation_date)
            $dateDesignated = $dateDesignated.text()
            let $reformattedDate = new Date($dateDesignated)
            $reformattedDate = $reformattedDate.getFullYear()
            let $dateDesignatedH4 = $('<h4>').text('Landmark Designation Date: ' + $reformattedDate)
            $('.info').append($h5)
            $('.info').append($h4)
            $('.info').append($anotherh4)
            $('.info').append($dateDesignatedH4)
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
//https://www.w3schools.com/jsref/jsref_substr.asp
//https://www.w3schools.com/jsref/jsref_getfullyear.asp?fbclid=IwAR0v4yMWMQdQ1tdPREJu5CuJwlLbKPcXRccymrBMOzEZ12Kx1hQ9BrbxZ5I
