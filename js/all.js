const puzzles = document.querySelectorAll('.puzzle-img')
const items = document.querySelectorAll('.puzzle-item')
const puzzlesRandom = document.querySelectorAll('.puzzles-random')
const again = document.querySelector('.again')
const puzzlesUl = document.querySelector('.puzzles')
const reset = document.querySelector('.reset')
let count = 0
function dragstart (e) {
    // this.classList.add('hold')
    setTimeout(() => (this.className = 'invisible'), 0)
    let id = e.target.id
    e.dataTransfer.setData('id', id)
}

function dragend () {
    this.classList = 'puzzle-img'
   
}

function dragenter (e) {
    //滑入
    e.preventDefault()
    this.classList.add('item-hover')
}

function dragover (e) {
    e.preventDefault()
}

function dragleave () {
    //滑出
    this.classList.remove('item-hover')
}

function dragdrop (e) {
    //放下
    let id = e.dataTransfer.getData('id')
    this.classList.remove('item-hover')
    let drapItem = document.getElementById(id)
    if (!id) return 
    e.target.append(drapItem)
    checkId(e.target)

}

function checkId (dropItem) {
    const itemId = dropItem.id.slice(-1)
    let puzzle = dropItem.childNodes[0]
    const puzzleId = puzzle.id.slice(-1)
    if (itemId === puzzleId) {
        puzzle.setAttribute('draggable', false)
        dropItem.classList.add('correct')
        count++
        setTimeout(() => {
            dropItem.classList.remove('correct')
        }, 500)
    }
    if (count === 9) {
        puzzlesUl.classList.add('puzzles-bring')
        dropItem.style.border = `none`
        setTimeout(() => {
            document.querySelector('.play').classList.add('invisible')
            document.querySelector('.end').classList.remove('invisible')
        }, 3000);
    }
}

function shuffle () {
    items.forEach((item, index) => {
        if (item.hasChildNodes()){
            item.childNodes[0].setAttribute('draggable', true)
            puzzlesRandom[index].append(item.childNodes[0])
            item.innerHTML = ''
        }
    })
    puzzlesRandom.forEach(puzzle => {
        let left = parseInt(Math.random() * (window.innerWidth/2 - 580))
        let top = parseInt(Math.random() * (window.innerHeight/2 - 200) + 90)
        puzzle.style.top = `${top}px`
        puzzle.style.left = `${left}px`
    })
}

function init () {
    if (document.querySelector('.play').className.includes('invisible')){
        document.querySelector('.play').classList.remove('invisible')
    }
    if (!document.querySelector('.end').className.includes('invisible')) {
        document.querySelector('.end').classList.add('invisible')
    }
    if (puzzlesUl.className.includes('puzzles-bring')) {
        puzzlesUl.classList.remove('puzzles-bring')
    }
    shuffle()
    count = 0
}

puzzles.forEach(puzzle => {
    puzzle.addEventListener('dragstart', dragstart)
    puzzle.addEventListener('dragend', dragend)
})

items.forEach(item => {
    item.addEventListener('dragenter', dragenter)
    item.addEventListener('dragover', dragover)
    item.addEventListener('dragleave', dragleave)
    item.addEventListener('drop', dragdrop)
})

again.addEventListener('click', init)
reset.addEventListener('click', init)
shuffle()