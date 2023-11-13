```typescript
// The JavaScript (should work in all major browsers and IE8+)

var elements = document.getElementsByClassName('element');
var target = document.getElementsByClassName('target')[0];
var button = document.getElementById('button');

// store the x,y coordinates of the target
var xT = target.offsetLeft;
var yT = target.offsetTop;

// add a click event listener to the button
button.addEventListener('click', function() {
  for (var i = 0; i < elements.length; i++) {
    // store the elements coordinate
    var xE = elements[i].offsetLeft;
    var yE = elements[i].offsetTop;
    // set elements position to their position for smooth animation
    elements[i].style.left = xE + 'px';
    elements[i].style.top = yE + 'px';
    // set their position to the target position
    // the animation is a simple css transition
    elements[i].style.left = xT + 'px';
    elements[i].style.top = yT + 'px';
  }
});
```

```css
/* The CSS you need for the animation: */

.element,
.target {
  position: absolute;
  transition: left 1s ease-out, top 1s ease-out;
}

/* And the rest... */

/*
 * Style everything to be visible
 */

.element,
.target {
  width: 10px;
  height: 10px;
  background-color: green;
}
.target {
  background-color: red;
}

/*
 * Randomize the elements position
 */

.element:nth-child(1) {
  left: 43px;
  top: 10px;
}
.element:nth-child(2) {
  left: 46px;
  top: 22px;
}
.element:nth-child(3) {
  left: 99px;
  top: 26px;
}
.element:nth-child(4) {
  left: 180px;
  top: 174px;
}
.element:nth-child(5) {
  left: 121px;
  top: 90px;
}
.target {
  top: 25px;
  left: 147px;
}
```

```html
<!-- The HTML (dead simple for the tutorials purpose) -->

<button id="button" role="button">Move!</button>

<div class="element"></div>
<div class="element"></div>
<div class="element"></div>
<div class="element"></div>
<div class="element"></div>

<div class="target"></div>
```