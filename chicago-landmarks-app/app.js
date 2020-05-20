$(() => {


    //some global variable declarations
    const currentYear = new Date().getFullYear()
    let currentImgIndex = 0
    let yearArray = []
    let landmarkArray = []

    //function to deal with dates like 1938-39
    const addingInTheBadData = (data, userInput) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].date_built !== undefined && data[i].date_built.includes(userInput)) {
          console.log(data[i]);
          const $h4 = $('<h4>')
          $h4.text(data[i].landmark_name + ', ' + data[i].date_built).attr('id', i).addClass('landmark-list')
          $('.landmarks').append($h4)
          $('.landmarks').children().eq(1).remove()
          additionalInfoGenerator(data)
        }
        else if (data[i].date_built !== undefined && data[i].date_built.slice(5,6) === userInput.slice(2,3)) {
          console.log(data[i]);
          const $h4 = $('<h4>')
          $h4.text(data[i].landmark_name + ', ' + data[i].date_built).attr('id', i).addClass('landmark-list')
          $('.landmarks').append($h4)
          $('.landmarks').children().eq(1).remove()
          additionalInfoGenerator(data)
        }
      }
    }

    //function to generate all info once landmark name is clicked on
    const additionalInfoGenerator = (data) => {
      $('.landmark-list').on('click', (event) => {
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
        $('.info').append($h5)
        $('.info').append($h4)
        $('.info').append($anotherh4)
        $('.info').append($dateDesignatedH4)
        $('.info').append($seeMoreLink)
        $('.info').append($imagesLink)
        const $iFrameSearch = $seeMoreLink.attr('id')
        $('.seemore').on('click', (event) => {
          scrollTo($('.seemore').offset())
          console.log($iFrameSearch);
          console.log(event.currentTarget);
          $('.see-more').remove()
          const $div = $('<div>').addClass('see-more').appendTo('.right-sidebar')
          const $h3 = $('<h3>').text('Additional Information').appendTo('.see-more')
          const $iframe = $('<iframe>').attr('id', 'iframe').attr('width', '100%').attr('height', '600').attr('src', $(event.currentTarget).attr('name') + $iFrameSearch)
          $iframe.appendTo('.see-more')
          $('#iframe').css('visibility', 'visible')
        })
      })
    }



    //hover event on b/w image to show text
    $('.about-image').hover((event) => {
      $('.hint').css('display', 'block')
    }, (event) => {
      $('.hint').css('display', 'none')
    })


    //click event on b/w image to show more about gold building
    $('#gold-building').on('click', (event) => {
      //clear out all the previously appended items, if any
      $('.gold').remove()
      $('.landmarks').remove()
      $('.periods').remove()
      $('.info').remove()
      $('.see-more').remove()
      $('.future').remove()
      const $goldBuilding = $(event.currentTarget).attr('id')
      console.log($goldBuilding);
      accessApi('1929', $goldBuilding)
    })


    //function that generates the div showing "contemporaneous architectural styles"
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
        architectureEra.text('Italianate Villa/Italianate, Octagon Style, Late Victorian, Romanesque Revival, Second Empire/Mansard, High Victorian Gothic, Chateauesque Style, Stick Style, Queen Anne, Shingle Style, Colonial Revival')
        $('.periods').append(architectureEra)
      }
      else if (userInput >= 1891 && userInput <= 1920) {
        const architectureEra = $('<h4>').addClass('styles')
        architectureEra.text('Sullivanesque, Commercial, Bungalow/Craftsman, Prairie School, Colonial Revival, Tudor Revival, Collegiate Gothic, Italian Renaissance Revival, Classical Revival, Beaux Arts')
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


    //where the app begins
    $('form').on('submit', (event) => {
      event.preventDefault()
      // $('.about-container').remove()
      // $('.main-content').slideDown()
      // $('#submit').
      $('.modal').remove()
      $('.gold').remove()
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
          //first easter egg, any input greater than current year will redirect to image carousel of future images
          if (userInput > currentYear) {
            const $div = $('<div>').addClass('future').appendTo('body')
            const $h2 = $('<h2>').text('We haven\'t made it to ' + userInput + ' yet. But here\'s what it might look like:').appendTo('.future')
            const $anotherdiv = $('<div>').addClass('future-image-container').appendTo($div)
            const $img = $('<img>').attr('src', 'images/future1.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img2 = $('<img>').attr('src', 'images/future2.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img3 = $('<img>').attr('src', 'images/future3.jpg').addClass('future-images').appendTo('.future-image-container')
            const $img4 = $('<img>').attr('src', 'images/future4.JPG').addClass('future-images').appendTo('.future-image-container')
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
          //second easter egg, anything less than 1833 will pop open the modal
          else if (userInput < 1833) {
            const $div = $('<div>').addClass('modal')
            const $anotherDiv = $('<div>').addClass('modal-info').appendTo($div)
            const $h3 = $('<h3>').text('Sounds like you need a history lesson!').appendTo($anotherDiv)
            const $h4 = $('<h4>').text('The southern wing of the Noble-Seymour-Crippen house, built in 1833 and residing in Norwood Park, is considered to be the oldest existing building in Chicago. This is a source of controversy, however, as Norwood Park was not annexed to Chicago until 1893').appendTo($anotherDiv)
            const $button = $('<button>').addClass('close-modal').appendTo($anotherDiv)
            $div.insertAfter($('.search-bar'))
            $div.css('width', '100%').css('border', '1px solid grey').css('position', 'fixed').css('height', '100%')
            $button.text('RETURN').css('border', '1px solid #575656').css('border-radius', '6%').css('background-color', '#8c8c8c').css('padding', '15px 20px')
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
            scrollTo($('.landmarks').offset())
            addingInTheBadData(data, userInput)
          }
          else if (imageClicks === 'gold-building') {
            const $div = $('<div>').prependTo('.left-sidebar').addClass('gold')
            const $h4 = $('<h4>').text(data[295].landmark_name).css('text-align', 'center').css('font-size', '1.3vw').css('color', 'gold').css('font-weight', '500').css('background-color', 'white')
            $div.append($h4)
            $('.gold').delay('1000').fadeOut('slow')
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
            scrollTo($('.landmarks').offset())
            // addingInTheBadData(data, userInput)
            additionalInfoGenerator(data)
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }




})
