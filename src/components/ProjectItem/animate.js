const easings = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity 
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
  }


function getValue(start, end, elapsed, duration, easeMethod) {
    if(elapsed > duration) return end;

    return start + (end - start) * easings[easeMethod](elapsed/duration);
}

export default function animate({
    fromValue,
    toValue,
    onUpdate,
    onComplete,
    duration = 600,
    easeMethod
}) {
    const startTime = performance.now;

    const tick = () => {
        const elapsed = performance.now() - startTime;

        window.requestAnimationFrame(() => {
            return onUpdate(
                getValue(fromValue, toValue, elapsed, duration, easeMethod),
                elapsed <= duration ? tick : onComplete //* Callback
            )
        })
    }

    tick();
}