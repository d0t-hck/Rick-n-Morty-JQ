'use strict'

$(function () {
  let modal = $('#modal')
  let overlay = $('#overlay')
  let list = []
  let apiLink = 'https://rickandmortyapi.com/api/character/'
  let info = null
  loadData(apiLink)
  hideModal()

  $(document).on('click', '.grid-item', function (e) {
    showModal()
  })

  $('#hide-modal').on('click', function () {
    hideModal()
  })

  $('#overlay').on('click', function () {
    hideModal()
  })

  $('.load-more').on('click', function () {
    loadData(info.next)
  })

  function loadData(apiLink) {
    $.get(apiLink, function (data) {
      list = [...list, ...data.results]
      info = data.info

      fillStats()
      renderList()
    })
  }

  function fillStats() {
    $('.current').text(list.length)
    $('.total').text(info.count)
  }

  function renderList() {
    $('#list').html('')
    $.each(list, function (index, item) {
      let row = `
      <div class="grid-item" data-id="${index}">
       <img src="${item.image}" />
      </div>`
      $('#list').append(row)
      // $(`[data-id='${index}']`).css({'background': `url(${item.image}) 50% 50% no-repeat`})
    })
  }


  function showModal() {
    modal.show()
    overlay.show()
  }

  function hideModal() {
    modal.hide()
    overlay.hide()
  }
})