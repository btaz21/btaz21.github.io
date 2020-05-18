$(() => {

    //start here

    //some global variable declarations
    const currentYear = new Date().getFullYear()
    let currentImgIndex = 0
    let yearArray = []
    //get lowest year variable by iterating through and finding lowest


    $('.about-image').hover((event) => {
      console.log('hi');
      $('.hint').css('display', 'block')
    }, (event) => {
      console.log('yo');
      $('.hint').css('display', 'none')
    })

    $('#gold-building').on('click', (event) => {
      $('.landmarks').remove()
      $('.periods').remove()
      $('.info').remove()
      $('.see-more').remove()
      $('.future').remove()
      const $goldBuilding = $(event.currentTarget).attr('id')
      console.log($goldBuilding);
      accessApi('1929', $goldBuilding)
    })


    eraGenerator = (userInput) => {
      const $div = $('<div>').addClass('periods').appendTo('.left-sidebar')
      const $h3 = $('<h3>').text('Contemporaneous Architectural Styles').appendTo($div)
      const $h4 = $('<h4>').addClass('styles')
      $h4.text(userInput).attr('id', 'year')
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

    //function to scroll page to correct location on click
    const scrollTo = (offsetValue) => {
      $("html, body").animate({scrollTop: offsetValue.top}, 'slow')
    }

    //function to clean up yearArray
    //function to find values not present in yearArray


    //where the app begins
    $('form').on('submit', (event) => {
      event.preventDefault()
      // $('.about-container').remove()
      // $('.main-content').slideDown()
      $('.landmarks').remove()
      $('.periods').remove()
      $('.info').remove()
      $('.see-more').remove()
      $('.future').remove()
      const userInput = $('input[type="text"]').val()
      $('.search-bar').css('background-color', 'rgba(255, 171, 110, 0.8)').css('border', '1px solid #DBD7D7')
      accessApi(userInput)
    })


    const accessApi = (userInput, imageClicks) => {
      $.ajax(
        {
          url: 'https://data.cityofchicago.org/resource/tdab-kixi.json'
        }
      ).then(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            yearArray.push(data[i].date_built)
          }
          if (userInput > currentYear) {
            const $div = $('<div>').addClass('future').appendTo('body')
            const $h2 = $('<h2>').text('We haven\'t made it to ' + userInput + ' yet. But here\'s what it might look like:').appendTo('.future')
            const $anotherdiv = $('<div>').addClass('future-image-container').appendTo($div)
            const $img = $('<img>').attr('src', 'images/future1.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img2 = $('<img>').attr('src', 'images/future2.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img3 = $('<img>').attr('src', 'images/future3.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img4 = $('<img>').attr('src', 'images/future4.jpg').addClass('future-images').appendTo('.future-image-container')
            const $numOfFutureImages = $('.future-image-container').children().length - 1
            const $nextButton = $('<button>').attr('id', 'next-button').addClass('lnr lnr-chevron-right')
            const $previousButton = $('<button>').attr('id', 'previous-button').addClass('lnr lnr-chevron-left')
            const $returnButton = $('<button>').attr('id', 'return').text('Yikes! Get Me Out of Here!')
            $nextButton.appendTo('.future-image-container')
            $previousButton.appendTo('.future-image-container')
            $returnButton.appendTo('.future')
            // const $offsetValue = $('.future').offset()
            scrollTo($('.future').offset())
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
            $('#return').on('click', () => {
              $('body').fadeOut('slow', () => {
                location.reload()
              })
            })
          }
          else if (userInput < 1833) {
            const $div = $('<div>').addClass('modal')
            const $anotherDiv = $('<div>').addClass('modal-info').appendTo($div)
            const $h3 = $('<h3>').text('Sounds like you need a history lesson!').appendTo($anotherDiv)
            const $h4 = $('<h4>').text('The southern wing of the Noble-Seymour-Crippen house, built in 1833 and residing in Norwood Park, is considered to be the oldest existing building in Chicago. This is a source of controversy, however, as Norwood Park was not annexed to Chicago until 1893').appendTo($anotherDiv)
            const $span = $('<span>').addClass('close-modal').appendTo($anotherDiv)
            $div.insertAfter($('.search-bar'))
            $div.css('width', '100%').css('border', '1px solid grey').css('position', 'fixed').css('height', '100%')
            $span.text('RETURN').css('border', '1px solid #575656').css('border-radius', '6%').css('background-color', '#8c8c8c').css('padding', '10px 15px')
            // $('form').off()
            $('.close-modal, .modal').on('click', () => {
              $('.modal').remove()
            })
          }
          else if (yearArray.includes(userInput) === false) {
            eraGenerator(userInput)
            const $div = $('<div>').addClass('landmarks').prependTo('.left-sidebar')
            const $h3 = $('<h3>').text('Historical Landmarks Built in ' + userInput).appendTo($div)
            const $h4 = $('<h4>').text('No landmarks available for this year')
            $('.landmarks').append($h4)
            // const $offsetValue = $('.landmarks').offset()
            scrollTo($('.landmarks').offset())
          }
          else if (imageClicks === 'gold-building') {
            eraGenerator(userInput)
            const $div = $('<div>').addClass('landmarks').prependTo('.left-sidebar')
            const $h3 = $('<h3>').text('Historical Landmarks Built in 1929').appendTo($div)
            const $h4 = $('<h4>').text(data[295].landmark_name).addClass('landmark-list')
            $('.landmarks').append($h4)
            const $offsetValue = $('.landmarks').offset()
            console.log($offsetValue);
            scrollTo($offsetValue)
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
            //scroll to event
            const $offsetValue = $('.landmarks').offset()
            console.log($offsetValue);
            scrollTo($offsetValue)
            $('.landmark-list').on('click', (event) => {
              // const $offsetValue = $('.landmark-list').offset()
              scrollTo($('.landmark-list').offset())
              $('.info').remove()
              $('.see-more').remove()
              const $div = $('<div>').addClass('info').appendTo('.right-sidebar')
              const $firsth3 = $('<h3>').text('Description').appendTo('.info')
              const landmarkListItem = $(event.currentTarget).attr('id')
              const $h5 = $('<h5>').text(data[landmarkListItem].landmark_name).addClass('info-items')
              const $h4 = $('<h4>').text(data[landmarkListItem].address).addClass('info-items')
              const $anotherh4 = $('<h4>').text('Architect: ' + data[landmarkListItem].architect).addClass('info-items')
              const $seeMoreLink = $('<h4>').text('Wikipedia').attr('id', data[landmarkListItem].landmark_name).addClass('info-items').addClass('seemore').attr('name', 'https://en.wikipedia.org/w/index.php?title=Special:Search&search=')
              const $imagesLink = $('<h4>').text('Preservation Chicago').attr('id', data[landmarkListItem].landmark_name).addClass('info-items').addClass('seemore').attr('name', 'https://preservationchicago.org/?s=')
              let $dateDesignated = $('<h4>').text(data[landmarkListItem].landmark_designation_date)
              $dateDesignated = $dateDesignated.text()
              let $reformattedDate = new Date($dateDesignated)
              $reformattedDate = $reformattedDate.getFullYear()
              let $dateDesignatedH4 = $('<h4>').text('Landmark Designation Date: ' + $reformattedDate).attr('id', 'last-info-item')
              //create stacking elements using transform css NEED TO WORK ON THIS
              // $('.info').css('transform', 'translateY(-290px)')
              // $('.info').css('background-color', '#04417a').css('border-radius', '0px')
              $('.info').append($h5)
              $('.info').append($h4)
              $('.info').append($anotherh4)
              $('.info').append($dateDesignatedH4)
              $('.info').append($seeMoreLink)
              $('.info').append($imagesLink)
              const $iFrameSearch = $seeMoreLink.attr('id')
              // console.log($iFrameSearch);
              $('.seemore').on('click', (event) => {
                // const $offsetValue = $('.seemore').offset()
                scrollTo($('.seemore').offset())
                console.log($iFrameSearch);
                console.log(event.currentTarget);
                $('.see-more').remove()
                const $div = $('<div>').addClass('see-more').appendTo('.right-sidebar')
                const $h3 = $('<h3>').text('Additional Information').appendTo('.see-more')
                const $iframe = $('<iframe>').attr('id', 'iframe').attr('width', '100%').attr('height', '600').attr('src', $(event.currentTarget).attr('name') + $iFrameSearch)
                // const $iframe2 = $iframe.clone().attr('src', 'https://www.google.com/search?tbm=isch&q=')
                $iframe.appendTo('.see-more')
                // $iframe2.appendTo('.see-more')
                $('#iframe').css('visibility', 'visible')
              })
            })
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }





    //end here

})
