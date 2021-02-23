/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

/* ---------- global functions - vendors ------------ */
Object.deepExtend = (function () {
  const deepClone = function (destination, source) {
    // eslint-disable-next-line no-unused-vars
    for (const property in source) {
      // 不存在该属性
      if (!Object.prototype.hasOwnProperty.call(source, property)) {
        continue
      }

      // source[property] 为对象,递归复制
      if (source[property] &&
        source[property].constructor &&
        source[property].constructor === Object) {
        destination[property] = destination[property] || {}
        deepClone(destination[property], source[property])

        // 直接复制属性
      } else {
        destination[property] = source[property]
      }
    }
    return destination
  }
  return deepClone
})()

const requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

const cancelRequestAnimFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})()

function hexToRgb (hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function clamp (number, min, max) {
  return Math.min(Math.max(number, min), max)
}

function isInArray (value, array) {
  return array.indexOf(value) > -1
}

function rgba (red, green, blue, alpha = 1) {
  return `rgba(${red},${green},${blue},${alpha})`
}

function hsla (hue, saturation, lightness, alpha = 1) {
  return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
}

/* ---------- pJS ------------ */
let pJSDom = []

const Particles = function (tagId, params) {
  const canvasElement = document.querySelector(`#${tagId} > .particles-js-canvas-el`)

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvasElement,
      w: canvasElement.offsetWidth,
      h: canvasElement.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      },
      mouse: {}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors: {}
    },
    tmp: {}
  }

  const pJS = this.pJS

  /* params settings */
  if (params) {
    Object.deepExtend(pJS, params)
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  }

  pJS.fn.retinaInit = function () {
    if (pJS.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio
      pJS.tmp.retina = true
    } else {
      pJS.canvas.pxratio = 1
      pJS.tmp.retina = false
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio
  }

  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function () {
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d')
  }

  pJS.fn.canvasSize = function () {
    pJS.canvas.el.width = pJS.canvas.w
    pJS.canvas.el.height = pJS.canvas.h

    if (pJS && pJS.interactivity.events.resize) {
      window.addEventListener('resize', function () {
        pJS.canvas.w = pJS.canvas.el.offsetWidth
        pJS.canvas.h = pJS.canvas.el.offsetHeight

        /* resize canvas */
        if (pJS.tmp.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio
          pJS.canvas.h *= pJS.canvas.pxratio
        }

        pJS.canvas.el.width = pJS.canvas.w
        pJS.canvas.el.height = pJS.canvas.h

        /* repaint canvas on anim disabled */
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesEmpty()
          pJS.fn.particlesCreate()
          pJS.fn.particlesDraw()
          pJS.fn.vendors.densityAutoParticles()
        }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles()
      })
    }
  }

  pJS.fn.canvasPaint = function () {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h)
  }

  pJS.fn.canvasClear = function () {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h)
  }

  /* --------- pJS functions - particles ----------- */

  pJS.fn.Particle = function (color, opacity, position) {
    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value
    if (pJS.particles.size.anim.enable) {
      this.size_status = false
      this.vs = pJS.particles.size.anim.speed / 100

      if (!pJS.particles.size.anim.sync) {
        this.vs = this.vs * Math.random()
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w
    this.y = position ? position.y : Math.random() * pJS.canvas.h

    /* check position  - into the canvas */
    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius
    else if (this.x < this.radius * 2) this.x = this.x + this.radius
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius
    else if (this.y < this.radius * 2) this.y = this.y + this.radius

    /* check position - avoid overlap */
    if (pJS.particles.move.bounce) {
      pJS.fn.vendors.checkOverlap(this, position)
    }

    /* color */
    this.color = {}
    if (typeof (color.value) === 'object') {
      if (color.value instanceof Array) {
        const colorSelected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)]
        this.color.rgb = hexToRgb(colorSelected)
      } else {
        if (color.value.r !== undefined && color.value.g !== undefined && color.value.b !== undefined) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if (color.value.h !== undefined && color.value.s !== undefined && color.value.l !== undefined) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }
    } else if (color.value === 'random') {
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 + 1))),
        g: (Math.floor(Math.random() * (255 + 1))),
        b: (Math.floor(Math.random() * (255 + 1)))
      }
    } else if (typeof (color.value) === 'string') {
      this.color = color
      this.color.rgb = hexToRgb(this.color.value)
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value
    if (pJS.particles.opacity.anim.enable) {
      this.opacity_status = false
      this.vo = pJS.particles.opacity.anim.speed / 100
      if (!pJS.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random()
      }
    }

    /* animation - velocity for speed */
    let velbase
    switch (pJS.particles.move.direction) {
      case 'top':
        velbase = { x: 0, y: -1 }
        break
      case 'top-right':
        velbase = { x: 0.5, y: -0.5 }
        break
      case 'right':
        velbase = { x: 1, y: -0 }
        break
      case 'bottom-right':
        velbase = { x: 0.5, y: 0.5 }
        break
      case 'bottom':
        velbase = { x: 0, y: 1 }
        break
      case 'bottom-left':
        velbase = { x: -0.5, y: 1 }
        break
      case 'left':
        velbase = { x: -1, y: 0 }
        break
      case 'top-left':
        velbase = { x: -0.5, y: -0.5 }
        break
      default:
        velbase = { x: 0, y: 0 }
        break
    }

    if (pJS.particles.move.straight) {
      this.vx = velbase.x
      this.vy = velbase.y
      if (pJS.particles.move.random) {
        this.vx = this.vx * (Math.random())
        this.vy = this.vy * (Math.random())
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5
      this.vy = velbase.y + Math.random() - 0.5
    }

    this.vx_i = this.vx
    this.vy_i = this.vy

    /* if shape is image */

    const shapeType = pJS.particles.shape.type
    if (typeof (shapeType) === 'object') {
      if (shapeType instanceof Array) {
        this.shape = shapeType[Math.floor(Math.random() * shapeType.length)]
      }
    } else {
      this.shape = shapeType
    }

    if (this.shape === 'image') {
      const sh = pJS.particles.shape
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }

      if (!this.img.ratio) this.img.ratio = 1

      if (pJS.tmp.img_type === 'svg' && pJS.tmp.source_svg !== undefined) {
        pJS.fn.vendors.createSvgImg(this)
        if (pJS.tmp.pushing) {
          this.img.loaded = false
        }
      }
    }
  }

  pJS.fn.Particle.prototype.draw = function () {
    let imgObj
    let colorValue
    let opacity
    let radius
    const p = this

    if (p.radius_bubble !== undefined) {
      radius = p.radius_bubble
    } else {
      radius = p.radius
    }

    if (p.opacity_bubble !== undefined) {
      opacity = p.opacity_bubble
    } else {
      opacity = p.opacity
    }

    if (p.color.rgb) {
      colorValue = rgba(p.color.rgb.r, p.color.rgb.g, p.color.rgb.b, opacity)
    } else {
      colorValue = hsla(p.color.hsl.h, p.color.hsl.s, p.color.hsl.l, opacity)
    }

    pJS.canvas.ctx.fillStyle = colorValue
    pJS.canvas.ctx.beginPath()

    switch (p.shape) {
      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false)
        break

      case 'edge':
        pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2)
        break

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x - radius, p.y + radius / 1.66, radius * 2, 3, 2)
        break

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides / 3.5), // startX
          p.y - radius / (2.66 / 3.5), // startY
          radius * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        )
        break

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius * 2 / (pJS.particles.shape.polygon.nb_sides / 4), // startX
          p.y - radius / (2 * 2.66 / 3.5), // startY
          radius * 2 * 2.66 / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        )
        break

      case 'image':
        if (pJS.tmp.img_type === 'svg') {
          imgObj = p.img.obj
        } else {
          imgObj = pJS.tmp.imgObj
        }

        if (imgObj) {
          // draw
          pJS.canvas.ctx.drawImage(
            imgObj,
            p.x - radius,
            p.y - radius,
            radius * 2,
            radius * 2 / p.img.ratio
          )
        }
        break
    }

    pJS.canvas.ctx.closePath()

    if (pJS.particles.shape.stroke.width > 0) {
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width
      pJS.canvas.ctx.stroke()
    }
    pJS.canvas.ctx.fill()
  }

  pJS.fn.particlesCreate = function () {
    for (let i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.Particle(pJS.particles.color, pJS.particles.opacity.value))
    }
  }

  pJS.fn.particlesUpdate = function () {
    let newPos
    for (let i = 0; i < pJS.particles.array.length; i++) {
      /* the particle */
      const p = pJS.particles.array[i]

      /* move the particle */
      if (pJS.particles.move.enable) {
        const ms = pJS.particles.move.speed / 2
        p.x += p.vx * ms
        p.y += p.vy * ms
      }

      /* change opacity status */
      if (pJS.particles.opacity.anim.enable) {
        if (p.opacity_status === true) {
          if (p.opacity >= pJS.particles.opacity.value) p.opacity_status = false
          p.opacity += p.vo
        } else {
          if (p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true
          p.opacity -= p.vo
        }
        if (p.opacity < 0) p.opacity = 0
      }

      /* change size */
      if (pJS.particles.size.anim.enable) {
        if (p.size_status === true) {
          if (p.radius >= pJS.particles.size.value) p.size_status = false
          p.radius += p.vs
        } else {
          if (p.radius <= pJS.particles.size.anim.size_min) {
            p.size_status = true
          }
          p.radius -= p.vs
        }
        if (p.radius < 0) {
          p.radius = 0
        }
      }

      /* change particle position if it is out of canvas */
      if (pJS.particles.move.out_mode === 'bounce') {
        newPos = {
          x_left: p.radius,
          x_right: pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      } else {
        newPos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if (p.x - p.radius > pJS.canvas.w) {
        p.x = newPos.x_left
        p.y = Math.random() * pJS.canvas.h
      } else if (p.x + p.radius < 0) {
        p.x = newPos.x_right
        p.y = Math.random() * pJS.canvas.h
      }
      if (p.y - p.radius > pJS.canvas.h) {
        p.y = newPos.y_top
        p.x = Math.random() * pJS.canvas.w
      } else if (p.y + p.radius < 0) {
        p.y = newPos.y_bottom
        p.x = Math.random() * pJS.canvas.w
      }

      /* out of canvas modes */
      if (pJS.particles.move.out_mode === 'bounce') {
        if (p.x + p.radius > pJS.canvas.w || p.x - p.radius < 0) {
          p.vx = -p.vx
        }
        if (p.y + p.radius > pJS.canvas.h || p.y - p.radius < 0) {
          p.vy = -p.vy
        }
      }

      /* events */
      if (isInArray('grab', pJS.interactivity.events.onhover.mode)) {
        pJS.fn.modes.grabParticle(p)
      }

      if (isInArray('bubble', pJS.interactivity.events.onhover.mode) ||
        isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.bubbleParticle(p)
      }

      if (isInArray('repulse', pJS.interactivity.events.onhover.mode) ||
        isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
        pJS.fn.modes.repulseParticle(p)
      }

      /* interaction auto between particles */
      if (pJS.particles.line_linked.enable || pJS.particles.move.attract.enable) {
        for (let j = i + 1; j < pJS.particles.array.length; j++) {
          const p2 = pJS.particles.array[j]

          /* link particles */
          if (pJS.particles.line_linked.enable) {
            pJS.fn.interact.linkParticles(p, p2)
          }

          /* attract particles */
          if (pJS.particles.move.attract.enable) {
            pJS.fn.interact.attractParticles(p, p2)
          }

          /* bounce particles */
          if (pJS.particles.move.bounce) {
            pJS.fn.interact.bounceParticles(p, p2)
          }
        }
      }
    }
  }

  pJS.fn.particlesDraw = function () {
    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h)

    /* update each particles param */
    pJS.fn.particlesUpdate()

    /* draw each particle */
    for (let i = 0; i < pJS.particles.array.length; i++) {
      const p = pJS.particles.array[i]
      p.draw()
    }
  }

  pJS.fn.particlesEmpty = function () {
    pJS.particles.array = []
  }

  pJS.fn.particlesRefresh = function () {
    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame)
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame)
    pJS.tmp.source_svg = undefined
    pJS.tmp.imgObj = undefined
    pJS.tmp.count_svg = 0
    pJS.fn.particlesEmpty()
    pJS.fn.canvasClear()

    /* restart */
    pJS.fn.vendors.start()
  }

  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function (p1, p2) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= pJS.particles.line_linked.distance) {
      const opacityLine = pJS.particles.line_linked.opacity -
        (dist / (1 / pJS.particles.line_linked.opacity)) /
        pJS.particles.line_linked.distance

      if (opacityLine > 0) {
        /* style */
        const colorLine = pJS.particles.line_linked.color_rgb_line

        pJS.canvas.ctx.strokeStyle = rgba(colorLine.r, colorLine.g, colorLine.b, opacityLine)
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width
        // pJS.canvas.ctx.lineCap = 'round' /* performance issue */

        /* path */
        pJS.canvas.ctx.beginPath()
        pJS.canvas.ctx.moveTo(p1.x, p1.y)
        pJS.canvas.ctx.lineTo(p2.x, p2.y)
        pJS.canvas.ctx.stroke()
        pJS.canvas.ctx.closePath()
      }
    }
  }

  pJS.fn.interact.attractParticles = function (p1, p2) {
    /* condensed particles */
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist <= pJS.particles.line_linked.distance) {
      const ax = dx / (pJS.particles.move.attract.rotateX * 1000)
      const ay = dy / (pJS.particles.move.attract.rotateY * 1000)

      p1.vx -= ax
      p1.vy -= ay

      p2.vx += ax
      p2.vy += ay
    }
  }

  pJS.fn.interact.bounceParticles = function (p1, p2) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const distP = p1.radius + p2.radius

    if (dist <= distP) {
      p1.vx = -p1.vx
      p1.vy = -p1.vy

      p2.vx = -p2.vx
      p2.vy = -p2.vy
    }
  }

  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function (nb, pos) {
    pJS.tmp.pushing = true
    for (let i = 0; i < nb; i++) {
      pJS.particles.array.push(
        new pJS.fn.Particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            x: pos ? pos.posX : Math.random() * pJS.canvas.w,
            y: pos ? pos.posY : Math.random() * pJS.canvas.h
          }
        )
      )
      if (i === nb - 1) {
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesDraw()
        }
        pJS.tmp.pushing = false
      }
    }
  }

  pJS.fn.modes.removeParticles = function (nb) {
    pJS.particles.array.splice(0, nb)
    if (!pJS.particles.move.enable) {
      pJS.fn.particlesDraw()
    }
  }

  pJS.fn.modes.bubbleParticle = function (p) {
    const timeSpent = (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000
    let opacity
    let size
    let dxMouse
    let dyMouse
    let distMouse
    /* on hover event */
    if (pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)) {
      dxMouse = p.x - pJS.interactivity.mouse.posX
      dyMouse = p.y - pJS.interactivity.mouse.posY
      distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
      const ratio = 1 - distMouse / pJS.interactivity.modes.bubble.distance

      const init = function () {
        p.opacity_bubble = p.opacity
        p.radius_bubble = p.radius
      }

      /* mousemove - check ratio */
      if (distMouse <= pJS.interactivity.modes.bubble.distance) {
        if (ratio >= 0 && pJS.interactivity.status === 'mousemove') {
          /* size */
          if (pJS.interactivity.modes.bubble.size !== pJS.particles.size.value) {
            if (pJS.interactivity.modes.bubble.size > pJS.particles.size.value) {
              size = p.radius + (pJS.interactivity.modes.bubble.size * ratio)
              if (size >= 0) {
                p.radius_bubble = size
              }
            } else {
              const dif = p.radius - pJS.interactivity.modes.bubble.size
              size = p.radius - (dif * ratio)
              if (size > 0) {
                p.radius_bubble = size
              } else {
                p.radius_bubble = 0
              }
            }
          }

          /* opacity */
          if (pJS.interactivity.modes.bubble.opacity !== pJS.particles.opacity.value) {
            if (pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value) {
              opacity = pJS.interactivity.modes.bubble.opacity * ratio
              if (opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity
              }
            } else {
              opacity = p.opacity - (pJS.particles.opacity.value - pJS.interactivity.modes.bubble.opacity) * ratio
              if (opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity) {
                p.opacity_bubble = opacity
              }
            }
          }
        }
      } else {
        init()
      }

      /* mouseleave */
      if (pJS.interactivity.status === 'mouseleave') {
        init()
      }

      /* on click event */
    } else if (pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)) {
      if (pJS.tmp.bubble_clicking) {
        dxMouse = p.x - pJS.interactivity.mouse.click_posX
        dyMouse = p.y - pJS.interactivity.mouse.click_posY
        distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (timeSpent > pJS.interactivity.modes.bubble.duration) {
          pJS.tmp.bubble_duration_end = true
        }

        if (timeSpent > pJS.interactivity.modes.bubble.duration * 2) {
          pJS.tmp.bubble_clicking = false
          pJS.tmp.bubble_duration_end = false
        }
      }

      const process = function (bubbleParam, particlesParam, pObjBubble, pObj, id) {
        let value
        let obj
        if (bubbleParam !== particlesParam) {
          if (!pJS.tmp.bubble_duration_end) {
            if (distMouse <= pJS.interactivity.modes.bubble.distance) {
              if (pObjBubble !== undefined) {
                obj = pObjBubble
              } else {
                obj = pObj
              }
              if (obj !== bubbleParam) {
                value = pObj - (timeSpent * (pObj - bubbleParam) / pJS.interactivity.modes.bubble.duration)
                if (id === 'size') p.radius_bubble = value
                if (id === 'opacity') p.opacity_bubble = value
              }
            } else {
              if (id === 'size') p.radius_bubble = undefined
              if (id === 'opacity') p.opacity_bubble = undefined
            }
          } else {
            if (pObjBubble !== undefined) {
              const valueTemp = pObj - (timeSpent * (pObj - bubbleParam) / pJS.interactivity.modes.bubble.duration)
              const dif = bubbleParam - valueTemp
              value = bubbleParam + dif
              if (id === 'size') p.radius_bubble = value
              if (id === 'opacity') p.opacity_bubble = value
            }
          }
        }
      }

      if (pJS.tmp.bubble_clicking) {
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size')
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity')
      }
    }
  }

  pJS.fn.modes.repulseParticle = function (p) {
    let repulseRadius
    if (pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status === 'mousemove') {
      const dxMouse = p.x - pJS.interactivity.mouse.posX
      const dyMouse = p.y - pJS.interactivity.mouse.posY
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

      const normVec = { x: dxMouse / distMouse, y: dyMouse / distMouse }
      repulseRadius = pJS.interactivity.modes.repulse.distance
      const velocity = 100
      const repulseFactor = clamp((1 / repulseRadius) * (-1 * Math.pow(distMouse / repulseRadius, 2) + 1) * repulseRadius * velocity, 0, 50)

      const pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if (pJS.particles.move.out_mode === 'bounce') {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y
      } else {
        p.x = pos.x
        p.y = pos.y
      }
    } else if (pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {
      if (!pJS.tmp.repulse_finish) {
        pJS.tmp.repulse_count++
        if (pJS.tmp.repulse_count === pJS.particles.array.length) {
          pJS.tmp.repulse_finish = true
        }
      }

      if (pJS.tmp.repulse_clicking) {
        repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance / 6, 3)

        const dx = pJS.interactivity.mouse.click_posX - p.x
        const dy = pJS.interactivity.mouse.click_posY - p.y
        const d = dx * dx + dy * dy

        const force = -repulseRadius / d

        const process = function () {
          const f = Math.atan2(dy, dx)
          p.vx = force * Math.cos(f)
          p.vy = force * Math.sin(f)

          if (pJS.particles.move.out_mode === 'bounce') {
            const pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w || pos.x - p.radius < 0) {
              p.vx = -p.vx
            }
            if (pos.y + p.radius > pJS.canvas.h || pos.y - p.radius < 0) {
              p.vy = -p.vy
            }
          }
        }

        // default
        if (d <= repulseRadius) {
          process()
        }
      } else {
        if (pJS.tmp.repulse_clicking === false) {
          p.vx = p.vx_i
          p.vy = p.vy_i
        }
      }
    }
  }

  pJS.fn.modes.grabParticle = function (p) {
    if (pJS.interactivity.events.onhover.enable && pJS.interactivity.status === 'mousemove') {
      const dxMouse = p.x - pJS.interactivity.mouse.posX
      const dyMouse = p.y - pJS.interactivity.mouse.posY
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (distMouse <= pJS.interactivity.modes.grab.distance) {
        const opacityLine = pJS.interactivity.modes.grab.line_linked.opacity - (distMouse / (1 / pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance

        if (opacityLine > 0) {
          /* style */
          const colorLine = pJS.particles.line_linked.color_rgb_line
          pJS.canvas.ctx.strokeStyle = rgba(colorLine.r, colorLine.g, colorLine.b, opacityLine)
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width
          // pJS.canvas.ctx.lineCap = 'round' /* performance issue */

          /* path */
          pJS.canvas.ctx.beginPath()
          pJS.canvas.ctx.moveTo(p.x, p.y)
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.posX, pJS.interactivity.mouse.posY)
          pJS.canvas.ctx.stroke()
          pJS.canvas.ctx.closePath()
        }
      }
    }
  }

  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function () {
    /* events target element */
    if (pJS.interactivity.detect_on === 'window') {
      pJS.interactivity.el = window
    } else {
      pJS.interactivity.el = pJS.canvas.el
    }
    /* detect mouse pos - on hover / click event */
    if (pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable) {
      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function (e) {
        let posX
        let posY
        if (pJS.interactivity.el === window) {
          posX = e.clientX
          posY = e.clientY
        } else {
          posX = e.offsetX || e.clientX
          posY = e.offsetY || e.clientY
        }
        pJS.interactivity.mouse.posX = posX
        pJS.interactivity.mouse.posY = posY
        if (pJS.tmp.retina) {
          pJS.interactivity.mouse.posX *= pJS.canvas.pxratio
          pJS.interactivity.mouse.posY *= pJS.canvas.pxratio
        }
        pJS.interactivity.status = 'mousemove'
      })

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function () {
        pJS.interactivity.mouse.posX = null
        pJS.interactivity.mouse.posY = null
        pJS.interactivity.status = 'mouseleave'
      })
    }

    /* on click event */
    if (pJS.interactivity.events.onclick.enable) {
      pJS.interactivity.el.addEventListener('click', function () {
        pJS.interactivity.mouse.click_posX = pJS.interactivity.mouse.posX
        pJS.interactivity.mouse.click_posY = pJS.interactivity.mouse.posY
        pJS.interactivity.mouse.click_time = new Date().getTime()

        if (pJS.interactivity.events.onclick.enable) {
          switch (pJS.interactivity.events.onclick.mode) {
            case 'push':
              if (pJS.particles.move.enable) {
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse)
              } else {
                if (pJS.interactivity.modes.push.particles_nb === 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse)
                } else if (pJS.interactivity.modes.push.particles_nb > 1) {
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb)
                }
              }
              break

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb)
              break

            case 'bubble':
              pJS.tmp.bubble_clicking = true
              break

            case 'repulse':
              pJS.tmp.repulse_clicking = true
              pJS.tmp.repulse_count = 0
              pJS.tmp.repulse_finish = false
              setTimeout(function () {
                pJS.tmp.repulse_clicking = false
              }, pJS.interactivity.modes.repulse.duration * 1000)
              break
          }
        }
      })
    }
  }

  pJS.fn.vendors.densityAutoParticles = function () {
    if (pJS.particles.number.density.enable) {
      /* calc area */
      let area = pJS.canvas.el.width * pJS.canvas.el.height / 1000
      if (pJS.tmp.retina) {
        area = area / (pJS.canvas.pxratio * 2)
      }

      /* calc number of particles based on density area */
      const nbParticles = area * pJS.particles.number.value / pJS.particles.number.density.value_area

      /* add or remove X particles */
      const missingParticles = pJS.particles.array.length - nbParticles
      if (missingParticles < 0) pJS.fn.modes.pushParticles(Math.abs(missingParticles))
      else pJS.fn.modes.removeParticles(missingParticles)
    }
  }

  pJS.fn.vendors.checkOverlap = function (p1, position) {
    for (let i = 0; i < pJS.particles.array.length; i++) {
      const p2 = pJS.particles.array[i]

      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS.canvas.w
        p1.y = position ? position.y : Math.random() * pJS.canvas.h
        pJS.fn.vendors.checkOverlap(p1)
      }
    }
  }

  pJS.fn.vendors.createSvgImg = function (p) {
    /* set color to svg element */
    const svgXml = pJS.tmp.source_svg
    const rgbHex = /#([0-9A-F]{3,6})/gi
    const coloredSvgXml = svgXml.replace(rgbHex, function () {
      let colorValue
      if (p.color.rgb) {
        colorValue = rgba(p.color.rgb.r, p.color.rgb.g, p.color.rgb.b, p.opacity)
      } else {
        colorValue = hsla(p.color.hsl.h, p.color.hsl.s, p.color.hsl.l, p.opacity)
      }
      return colorValue
    })

    /* prepare to create img with colored svg */
    const svg = new Blob([coloredSvgXml], { type: 'image/svg+xmlcharset=utf-8' })
    const DOMURL = window.URL || window.webkitURL || window
    const url = DOMURL.createObjectURL(svg)

    /* create particle img obj */
    const img = new Image()
    img.addEventListener('load', function () {
      p.img.obj = img
      p.img.loaded = true
      DOMURL.revokeObjectURL(url)
      pJS.tmp.count_svg++
    })
    img.src = url
  }

  pJS.fn.vendors.destroypJS = function () {
    cancelAnimationFrame(pJS.fn.drawAnimFrame)
    canvasElement.remove()
    pJSDom = null
  }

  pJS.fn.vendors.drawShape = function (c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
    let i
    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    const sideCount = sideCountNumerator * sideCountDenominator
    const decimalSides = sideCountNumerator / sideCountDenominator
    const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides
    const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180 // convert to radians
    c.save()
    c.beginPath()
    c.translate(startX, startY)
    c.moveTo(0, 0)
    for (i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0)
      c.translate(sideLength, 0)
      c.rotate(interiorAngle)
    }
    // c.stroke()
    c.fill()
    c.restore()
  }

  pJS.fn.vendors.exportImg = function () {
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank')
  }

  pJS.fn.vendors.loadImg = function (type) {
    pJS.tmp.img_error = undefined
    if (pJS.particles.shape.image.src !== '') {
      if (type === 'svg') {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', pJS.particles.shape.image.src)
        xhr.onreadystatechange = function (data) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              pJS.tmp.source_svg = data.currentTarget.response
              pJS.fn.vendors.checkBeforeDraw()
            } else {
              console.log('Error pJS - Image not found')
              pJS.tmp.img_error = true
            }
          }
        }
        xhr.send()
      } else {
        const img = new Image()
        img.addEventListener('load', function () {
          pJS.tmp.imgObj = img
          pJS.fn.vendors.checkBeforeDraw()
        })
        img.src = pJS.particles.shape.image.src
      }
    } else {
      console.log('Error pJS - No image.src')
      pJS.tmp.img_error = true
    }
  }

  pJS.fn.vendors.draw = function () {
    if (pJS.particles.shape.type === 'image') {
      if (pJS.tmp.img_type === 'svg') {
        if (pJS.tmp.count_svg >= pJS.particles.number.value) {
          pJS.fn.particlesDraw()
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame)
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw)
        } else {
          // console.log('still loading...')
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw)
        }
      } else {
        if (pJS.tmp.imgObj !== undefined) {
          pJS.fn.particlesDraw()
          if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame)
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw)
        } else {
          if (!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw)
        }
      }
    } else {
      pJS.fn.particlesDraw()
      if (!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame)
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw)
    }
  }

  pJS.fn.vendors.checkBeforeDraw = function () {
    // if shape is image
    if (pJS.particles.shape.type === 'image') {
      if (pJS.tmp.img_type === 'svg' && pJS.tmp.source_svg === undefined) {
        pJS.tmp.checkAnimFrame = requestAnimFrame()
      } else {
        // console.log('images loaded! cancel check')
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame)
        if (!pJS.tmp.img_error) {
          pJS.fn.vendors.init()
          pJS.fn.vendors.draw()
        }
      }
    } else {
      pJS.fn.vendors.init()
      pJS.fn.vendors.draw()
    }
  }

  pJS.fn.vendors.init = function () {
    /* init canvas + particles */
    pJS.fn.retinaInit()
    pJS.fn.canvasInit()
    pJS.fn.canvasSize()
    pJS.fn.canvasPaint()
    pJS.fn.particlesCreate()
    pJS.fn.vendors.densityAutoParticles()

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color)
  }

  pJS.fn.vendors.start = function () {
    if (isInArray('image', pJS.particles.shape.type)) {
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3)
      pJS.fn.vendors.loadImg(pJS.tmp.img_type)
    } else {
      pJS.fn.vendors.checkBeforeDraw()
    }
  }

  /* ---------- pJS - start ------------ */
  pJS.fn.vendors.eventsListeners()
  pJS.fn.vendors.start()
}

/* ---------- particles.js functions - start ------------ */

const particlesJS = function (tagId, params) {
  /* no string id? so it's object params, and set the id with default id */
  if (typeof (tagId) !== 'string') {
    params = tagId
    tagId = 'particles-js'
  }

  /* no id? set the id to default id */
  if (!tagId) {
    tagId = 'particles-js'
  }

  /* pJS elements */
  const particlesTag = document.getElementById(tagId)
  const particlesCanvasClass = 'particles-js-canvas-el'
  const existCanvas = particlesTag.getElementsByClassName(particlesCanvasClass)

  /* remove canvas if exists into the pJS target tag */
  if (existCanvas.length) {
    while (existCanvas.length > 0) {
      particlesTag.removeChild(existCanvas[0])
    }
  }

  /* create canvas element */
  const canvasElement = document.createElement('canvas')
  canvasElement.className = particlesCanvasClass

  /* set size canvas */
  canvasElement.style.width = '100%'
  canvasElement.style.height = '100%'

  /* append canvas */
  const canvas = document.getElementById(tagId).appendChild(canvasElement)

  /* launch particle.js */
  if (canvas !== null) {
    pJSDom.push(new Particles(tagId, params))
  }
}

particlesJS.load = function (tagId, pathConfigJson, callback) {
  /* load json config */
  const xhr = new XMLHttpRequest()
  xhr.open('GET', pathConfigJson)
  xhr.onreadystatechange = function (data) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const params = JSON.parse(data.currentTarget.response)
        particlesJS(tagId, params)
        if (callback) callback()
      } else {
        console.log('Error pJS - XMLHttpRequest status: ' + xhr.status)
        console.log('Error pJS - File config not found')
      }
    }
  }
  xhr.send()
}

export default particlesJS
