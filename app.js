// Constants for button sizes (in SVG units)
// Converting mm to SVG units (40000/400 = 100 units per mm)
const BUTTON_24MM = 24 * 100;
const BUTTON_30MM = 30 * 100;
const SAFETY_MARGIN = 5.5 * 100;

// Frame boundary constants based on the SVG path
const FRAME = {
    LEFT: 5768,      // Left edge from path
    RIGHT: 34232,    // Right edge (40000 - 5768)
    TOP: 2340,       // Top edge from path
    BOTTOM: 27660,   // Bottom edge approximated from path
    NOTCH: {         // The notch on the right side
        X: 28000,    // X position where notch starts
        Y: 20000,    // Y position where notch starts
        WIDTH: 6232, // Width of the notch
        HEIGHT: 5000 // Height of the notch
    }
};

// Joystick constants
const JOYSTICK = {
    WIDTH: 7800,   // 78mm * 100
    HEIGHT: 10000, // 100mm * 100
    CORNER_RADIUS: 500,
    GRID_STEP: 500,  // Reduced from 1000 to 500 for finer positioning
    MARGIN: 800,     // Reduced from 1000 to 800
    VISUAL_MARGIN: 1000 // Reduced from 1500 to 1000
};

// SVG namespace
const SVG_NS = "http://www.w3.org/2000/svg";

// Initialize canvas
const canvasContainer = document.getElementById('canvas-container');
const svgFrame = `<svg xmlns="${SVG_NS}" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" width="100%" height="100%" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 40000 30000">
    <defs>
        <style type="text/css">
            <![CDATA[
                .str0 {stroke:black;stroke-width:141.11}
                .fil0 {fill:black}
                .inner-frame {fill:none;stroke:none;pointer-events:all}
                .inner-stroke {stroke:red;stroke-width:141.11;fill:none}
            ]]>
        </style>
    </defs>
    <g id="Livello_x0020_1">
        <metadata id="CorelCorpID_0Corel-Layer"/>
        <path class="fil0 str0" d="M5768 2340c9488,-10 18976,-10 28464,0 262,1 523,1 785,2 287,1 537,51 786,199 252,149 465,375 658,593l6 7 6 7c103,132 207,263 304,399 259,359 514,721 767,1085l2 3 2 3c88,132 176,263 254,400 282,493 392,822 387,1396l0 3 -31 1069c-156,3986 -258,7974 -313,11963 -19,1389 -16,2778 -31,4168 -7,576 -90,942 -413,1430 -180,272 -374,531 -574,788 -208,268 -418,536 -629,802l-4 5 -89 104c-397,463 -818,872 -1466,896l-6 0 -5 0c-9752,8 -19504,8 -29256,0l-5 0 -6 0c-648,-24 -1069,-433 -1466,-896l-89 -104 -4 -5c-211,-266 -421,-534 -629,-802 -200,-257 -394,-516 -574,-788 -323,-488 -408,-855 -413,-1431 -7,-932 -14,-1863 -22,-2795 -13,-1482 -26,-2965 -55,-4448 -30,-1548 -77,-3095 -125,-4643 -44,-1414 -87,-2829 -142,-4244l-31 -1069 0 -3c-5,-574 105,-903 387,-1396 78,-137 166,-268 254,-400l2 -3 2 -3c253,-364 508,-726 767,-1085 97,-136 201,-267 304,-399l6 -7 6 -7c193,-218 406,-444 658,-593 249,-148 499,-198 786,-199 262,-1 523,-1 785,-2zm-1344 2769c-188,263 -375,1128 -560,1393 -5,8 19,701 21,773 61,1565 109,3129 158,4694 53,1720 105,3441 139,5162 33,1649 48,3299 62,4948 8,928 15,1103 22,2031 83,111 167,221 253,330 117,150 936,1052 1054,1202 5086,4 7408,5 12495,5 1974,-1262 3155,-4388 3988,-5808 312,-583 2302,-477 2801,-477l8451 0c539,0 981,426 1000,964 44,1261 228,2743 1432,3817 39,-5629 154,-11242 375,-16869l23 -769c-148,-248 -389,-1154 -562,-1396 -10384,-12 -20768,-12 -31152,0z"/>
        <!-- Inner frame path that defines the playable area -->
        <path id="inner-frame" class="inner-frame" d="M7000 4000 L33000 4000 L33000 20000 L28000 20000 L28000 26000 L7000 26000 Z"/>
        <!-- Inner frame path with red stroke -->
        <path class="inner-stroke" d="M4424 5109c-188,263 -375,1128 -560,1393 -5,8 19,701 21,773 61,1565 109,3129 158,4694 53,1720 105,3441 139,5162 33,1649 48,3299 62,4948 8,928 15,1103 22,2031 83,111 167,221 253,330 117,150 936,1052 1054,1202 5086,4 7408,5 12495,5 1974,-1262 3155,-4388 3988,-5808 312,-583 2302,-477 2801,-477l8451 0c539,0 981,426 1000,964 44,1261 228,2743 1432,3817 39,-5629 154,-11242 375,-16869l23 -769c-148,-248 -389,-1154 -562,-1396 -10384,-12 -20768,-12 -31152,0z"/>
        <rect class="frame-bounds" x="${FRAME.LEFT}" y="${FRAME.TOP}" width="${FRAME.RIGHT - FRAME.LEFT}" height="${FRAME.BOTTOM - FRAME.TOP}" style="fill:none;stroke:none"/>
        <path id="inner-boundary" d="M4424 5109c-188,263 -375,1128 -560,1393 -5,8 19,701 21,773 61,1565 109,3129 158,4694 53,1720 105,3441 139,5162 33,1649 48,3299 62,4948 8,928 15,1103 22,2031 83,111 167,221 253,330 117,150 936,1052 1054,1202 5086,4 7408,5 12495,5 1974,-1262 3155,-4388 3988,-5808 312,-583 2302,-477 2801,-477l8451 0c539,0 981,426 1000,964 44,1261 228,2743 1432,3817 39,-5629 154,-11242 375,-16869l23 -769c-148,-248 -389,-1154 -562,-1396 -10384,-12 -20768,-12 -31152,0z" style="fill:none;stroke:none;pointer-events:all"/>
    </g>
</svg>`;

canvasContainer.innerHTML = svgFrame;
const svg = canvasContainer.querySelector('svg');
let selectedElement = null;
let components = [];
let offset = { x: 0, y: 0 };

// Add event listeners to buttons
document.getElementById('add24mm').addEventListener('click', () => addButton(BUTTON_24MM));
document.getElementById('add30mm').addEventListener('click', () => addButton(BUTTON_30MM));
document.getElementById('addJoystick').addEventListener('click', addJoystick);
document.getElementById('delete').addEventListener('click', deleteSelected);
document.getElementById('generateLayout').addEventListener('click', generateLayout);
document.getElementById('showPreview').addEventListener('click', showPreview);
document.getElementById('closePreview').addEventListener('click', closePreview);
document.getElementById('downloadSvg').addEventListener('click', downloadSvg);

function generateLayout() {
    const oldMerged = svg.querySelector('.merged-path');
    if (oldMerged) oldMerged.remove();
    
    const path = generateMergedPath();
    if (path) {
        path.classList.add('merged-path');
        svg.appendChild(path);
    }
}

function generateMergedPath() {
    if (components.length === 0) return null;

    // Create paths for ClipperJS
    const clipPaths = [];
    const scale = 100; // Scale up for better precision
    
    // Only process regular buttons, explicitly exclude joysticks and their holes
    const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
    
    if (buttons.length === 0) return null;
    
    buttons.forEach(component => {
        const circle = component.querySelector('circle:not(.margin-circle)');
        if (!circle) return;

        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r')) + SAFETY_MARGIN;

        // Create points for a circle approximation (96 points for smoother circles)
        const points = [];
        for (let i = 0; i < 96; i++) {
            const angle = (i * Math.PI * 2) / 96;
            points.push({
                X: Math.round((cx + Math.cos(angle) * r) * scale),
                Y: Math.round((cy + Math.sin(angle) * r) * scale)
            });
        }
        clipPaths.push(points);
    });

    if (clipPaths.length === 0) return null;

    // Special case: If there's only one button, create the margin circle directly
    if (clipPaths.length === 1) {
        const circle = buttons[0].querySelector('circle:not(.margin-circle)');
        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r')) + SAFETY_MARGIN;

        const mergedPath = document.createElementNS(SVG_NS, 'circle');
        mergedPath.setAttribute('cx', cx);
        mergedPath.setAttribute('cy', cy);
        mergedPath.setAttribute('r', r);
        mergedPath.setAttribute('fill', 'none');
        mergedPath.setAttribute('stroke', 'black');
        mergedPath.setAttribute('stroke-width', '2');
        return mergedPath;
    }

    // Set up ClipperJS for multiple buttons
    const cpr = new ClipperLib.Clipper();
    const solution = new ClipperLib.Paths();
    
    // Add first path as subject
    cpr.AddPath(clipPaths[0], ClipperLib.PolyType.ptSubject, true);
    
    // Add remaining paths and perform union operations
    for (let i = 1; i < clipPaths.length; i++) {
        cpr.AddPath(clipPaths[i], ClipperLib.PolyType.ptClip, true);
        cpr.Execute(ClipperLib.ClipType.ctUnion, solution, 
                   ClipperLib.PolyFillType.pftNonZero, 
                   ClipperLib.PolyFillType.pftNonZero);
        
        // Reset for next iteration
        if (i < clipPaths.length - 1) {
            cpr.Clear();
            cpr.AddPaths(solution, ClipperLib.PolyType.ptSubject, true);
            solution.length = 0;
        }
    }

    // Convert back to SVG path
    let pathData = '';
    solution.forEach((path, pathIndex) => {
        path.forEach((point, pointIndex) => {
            const x = point.X / scale;
            const y = point.Y / scale;
            pathData += pointIndex === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
        });
        pathData += 'Z ';
    });

    // Create the SVG path element
    const mergedPath = document.createElementNS(SVG_NS, 'path');
    mergedPath.setAttribute('d', pathData);
    mergedPath.setAttribute('stroke', 'black');
    mergedPath.setAttribute('stroke-width', '2');
    mergedPath.setAttribute('fill', 'none');
    mergedPath.setAttribute('stroke-linejoin', 'round');
    mergedPath.setAttribute('stroke-linecap', 'round');

    return mergedPath;
}

function addButton(size) {
    console.log('Creating button with size:', size);
    
    const position = findValidButtonPosition(size);
    if (!position) {
        console.error('No valid position found for button');
        alert('No space available for new button');
        return;
    }
    
    const button = document.createElementNS(SVG_NS, 'g');
    button.setAttribute('class', 'draggable');
    button.setAttribute('data-type', 'button');
    button.setAttribute('data-size', size);

    const radius = size / 2;
    console.log('Button radius:', radius);
    
    // Create the main button circle
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', position.x);
    circle.setAttribute('cy', position.y);
    circle.setAttribute('r', radius);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '141.11');
    console.log('Created main circle:', {
        cx: circle.getAttribute('cx'),
        cy: circle.getAttribute('cy'),
        r: circle.getAttribute('r')
    });
    
    // Create the margin circle
    const marginCircle = document.createElementNS(SVG_NS, 'circle');
    marginCircle.setAttribute('cx', position.x);
    marginCircle.setAttribute('cy', position.y);
    marginCircle.setAttribute('r', radius + SAFETY_MARGIN);
    marginCircle.setAttribute('class', 'margin-circle');
    console.log('Created margin circle:', {
        cx: marginCircle.getAttribute('cx'),
        cy: marginCircle.getAttribute('cy'),
        r: marginCircle.getAttribute('r'),
        margin: SAFETY_MARGIN
    });
    
    button.appendChild(marginCircle);
    button.appendChild(circle);
    svg.appendChild(button);
    addDragBehavior(button);
    components.push(button);
    updateMergedOutline();
    
    console.log('Button added successfully with properties:', {
        size: size,
        radius: radius,
        position: position,
        totalComponents: components.length
    });
}

function addJoystick() {
    const validPosition = findValidJoystickPosition();
    
    if (!validPosition) {
        alert("No available space for joystick. Please move or delete other components to make room.");
        return;
    }
    
    const { x, y } = validPosition;
    
    // Create joystick group with pointer events enabled
    const joystickGroup = document.createElementNS(SVG_NS, 'g');
    joystickGroup.setAttribute('data-type', 'joystick');
    joystickGroup.setAttribute('class', 'draggable');
    joystickGroup.setAttribute('pointer-events', 'all');
    
    // Create main rectangle with pointer events and minimal fill for interaction
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', JOYSTICK.WIDTH);
    rect.setAttribute('height', JOYSTICK.HEIGHT);
    rect.setAttribute('rx', JOYSTICK.CORNER_RADIUS);
    rect.setAttribute('ry', JOYSTICK.CORNER_RADIUS);
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '141.11');
    rect.setAttribute('fill', 'rgba(255,255,255,0.01)');
    rect.setAttribute('pointer-events', 'all');
    
    // Add mounting holes with pointer events
    const holeRadius = 300; // 3mm holes
    const holeMargin = 1000; // 10mm from edges
    const holes = [
        { x: x + holeMargin, y: y + holeMargin }, // Top-left
        { x: x + JOYSTICK.WIDTH - holeMargin, y: y + holeMargin }, // Top-right
        { x: x + holeMargin, y: y + JOYSTICK.HEIGHT - holeMargin }, // Bottom-left
        { x: x + JOYSTICK.WIDTH - holeMargin, y: y + JOYSTICK.HEIGHT - holeMargin } // Bottom-right
    ];
    
    // Create center hole (larger for the joystick shaft)
    const centerHole = document.createElementNS(SVG_NS, 'circle');
    centerHole.setAttribute('cx', x + JOYSTICK.WIDTH/2);
    centerHole.setAttribute('cy', y + JOYSTICK.HEIGHT/2);
    centerHole.setAttribute('r', 1500); // 15mm center hole
    centerHole.setAttribute('stroke', 'black');
    centerHole.setAttribute('stroke-width', '141.11');
    centerHole.setAttribute('fill', 'rgba(255,255,255,0.01)');
    centerHole.setAttribute('pointer-events', 'all');
    
    // Add all holes
    holes.forEach(pos => {
        const hole = document.createElementNS(SVG_NS, 'circle');
        hole.setAttribute('cx', pos.x);
        hole.setAttribute('cy', pos.y);
        hole.setAttribute('r', holeRadius);
        hole.setAttribute('stroke', 'black');
        hole.setAttribute('stroke-width', '141.11');
        hole.setAttribute('fill', 'rgba(255,255,255,0.01)');
        hole.setAttribute('pointer-events', 'all');
        joystickGroup.appendChild(hole);
    });
    
    // Add elements to group in correct order
    joystickGroup.appendChild(rect);
    joystickGroup.appendChild(centerHole);
    
    // Add to components and SVG
    components.push(joystickGroup);
    svg.appendChild(joystickGroup);
    
    // Add drag behavior
    addDragBehavior(joystickGroup);
    
    // Select the new joystick
    selectElement(joystickGroup);
}

function addDragBehavior(component) {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    let hasMoved = false;
    
    component.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    
    // Add click handler for selection
    component.addEventListener('click', (e) => {
        e.stopPropagation();
        // Only handle click if it wasn't a drag
        if (!hasMoved) {
            selectElement(component);
        }
    });
    
    function startDragging(e) {
        if (e.button !== 0) return; // Only handle left click
        isDragging = true;
        hasMoved = false;
        dragStartTime = Date.now();
        
        const point = getMousePosition(e);
        initialX = point.x;
        initialY = point.y;
        
        if (component.getAttribute('data-type') === 'button') {
            const circle = component.querySelector('circle:not(.margin-circle)');
            currentX = parseFloat(circle.getAttribute('cx'));
            currentY = parseFloat(circle.getAttribute('cy'));
        } else {
            const rect = component.querySelector('rect');
            if (rect) {
                // Store top-left position for joystick
                currentX = parseFloat(rect.getAttribute('x'));
                currentY = parseFloat(rect.getAttribute('y'));
            }
        }
        
        // Select the component when starting drag
        selectElement(component);
        e.stopPropagation();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const point = getMousePosition(e);
        const dx = point.x - initialX;
        const dy = point.y - initialY;
        
        // Mark as moved if there's significant movement
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            hasMoved = true;
        }
        
        const newX = currentX + dx;
        const newY = currentY + dy;
        
        // Check for collisions based on component type
        let hasCollision = false;
        if (component.getAttribute('data-type') === 'button') {
            hasCollision = checkCollision(component, newX, newY);
        } else if (component.getAttribute('data-type') === 'joystick') {
            // Pass top-left coordinates directly
            hasCollision = checkJoystickCollision(component, newX, newY);
        }
        
        // Check if new position would be inside the frame
        let isInsideFrame = true;
        if (component.getAttribute('data-type') === 'joystick') {
            const corners = [
                { x: newX, y: newY }, // Top-left
                { x: newX + JOYSTICK.WIDTH, y: newY }, // Top-right
                { x: newX + JOYSTICK.WIDTH, y: newY + JOYSTICK.HEIGHT }, // Bottom-right
                { x: newX, y: newY + JOYSTICK.HEIGHT } // Bottom-left
            ];
            isInsideFrame = corners.every(corner => isPointInsidePath(corner.x, corner.y));
        } else {
            isInsideFrame = isPointInsidePath(newX, newY);
        }
        
        if (!hasCollision && isInsideFrame) {
            if (component.getAttribute('data-type') === 'button') {
                updateButtonPosition(component, newX, newY);
                forceRedrawMergedOutline();
            } else if (component.getAttribute('data-type') === 'joystick') {
                // Pass top-left coordinates
                updateJoystickPosition(component, newX, newY);
            }
        }
    }
    
    function stopDragging(e) {
        if (isDragging) {
            isDragging = false;
            
            // If it was a quick tap without movement, ensure it's selected
            const dragDuration = Date.now() - dragStartTime;
            if (dragDuration < 200 && !hasMoved) {
                selectElement(component);
            }
            
            // Final update of merged outline
            requestAnimationFrame(() => {
                // Double check no lingering outlines
                const remainingOutlines = svg.querySelectorAll('.merged-outline');
                remainingOutlines.forEach(outline => outline.remove());
                
                // Create new merged outline only if we have button components
                const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
                if (buttons.length > 0) {
                    const mergedPath = generateMergedPath();
                    if (mergedPath) {
                        mergedPath.classList.add('merged-outline');
                        mergedPath.setAttribute('fill', 'none');
                        mergedPath.setAttribute('stroke', 'black');
                        mergedPath.setAttribute('stroke-width', '141.11');
                        svg.insertBefore(mergedPath, svg.firstChild);
                    }
                }
            });
        }
    }
}

function selectElement(element) {
    // Deselect previous selection if it exists and is different
    if (selectedElement && selectedElement !== element) {
        selectedElement.classList.remove('selected');
    }
    
    // Select new element
    selectedElement = element;
    element.classList.add('selected');
}

function isPointInsidePath(x, y) {
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    
    const innerBoundary = document.getElementById('inner-boundary');
    
    // Create a temporary point for testing
    const testPoint = svg.createSVGPoint();
    testPoint.x = x;
    testPoint.y = y;
    
    // Get the current transformation matrix and its inverse
    const matrix = innerBoundary.getScreenCTM();
    if (matrix) {
        const inverse = matrix.inverse();
        testPoint.matrixTransform(inverse);
    }
    
    return innerBoundary.isPointInFill(point);
}

function checkCollision(component, newX, newY) {
    const circle = component.querySelector('circle:not(.margin-circle)');
    const radius = parseFloat(circle.getAttribute('r'));
    const marginRadius = radius + SAFETY_MARGIN;
    
    // Check if any point of the margin circle would be outside the boundary
    const numPoints = 16; // Check points around the margin circle
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const testX = newX + Math.cos(angle) * marginRadius;
        const testY = newY + Math.sin(angle) * marginRadius;
        
        if (!isPointInsidePath(testX, testY)) {
            return true; // Collision with boundary
        }
    }
    
    // Check collision with other components
    for (const other of components) {
        if (other === component) continue;
        
        if (other.getAttribute('data-type') === 'button') {
            const otherCircle = other.querySelector('circle:not(.margin-circle)');
            const buttonX = parseFloat(otherCircle.getAttribute('cx'));
            const buttonY = parseFloat(otherCircle.getAttribute('cy'));
            const buttonRadius = parseFloat(otherCircle.getAttribute('r'));
            
            const dx = newX - buttonX;
            const dy = newY - buttonY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check if this button's margin would collide with the other button's inner circle
            // OR if the other button's margin would collide with this button's inner circle
            if (distance < (marginRadius + buttonRadius) || 
                distance < (radius + buttonRadius + SAFETY_MARGIN)) {
                return true;
            }
        } else {
            // Check collision with other joysticks
            const rect = other.querySelector('rect');
            const rectX = parseFloat(rect.getAttribute('x'));
            const rectY = parseFloat(rect.getAttribute('y'));
            
            // Simple rectangle overlap check
            if (!(newX + marginRadius < rectX || 
                  newX - marginRadius > rectX + JOYSTICK.WIDTH || 
                  newY + marginRadius < rectY || 
                  newY - marginRadius > rectY + JOYSTICK.HEIGHT)) {
                return true; // Collision detected
            }
        }
    }
    
    return false;
}

function checkJoystickCollision(excludeComponent, x, y) {
    // Use separate margins for different types of collisions
    const buttonMargin = JOYSTICK.MARGIN + 500; // Extra space from buttons
    const joystickMargin = JOYSTICK.MARGIN;     // Less space needed between joysticks
    
    // Check collision with each component
    for (const component of components) {
        if (component === excludeComponent) continue;
        
        if (component.getAttribute('data-type') === 'button') {
            const circle = component.querySelector('circle');
            const cx = parseFloat(circle.getAttribute('cx'));
            const cy = parseFloat(circle.getAttribute('cy'));
            const r = parseFloat(circle.getAttribute('r')) + buttonMargin;
            
            // Check joystick corners against button
            const corners = [
                { x, y },
                { x: x + JOYSTICK.WIDTH, y },
                { x: x + JOYSTICK.WIDTH, y: y + JOYSTICK.HEIGHT },
                { x, y: y + JOYSTICK.HEIGHT }
            ];
            
            // If any corner is too close to button center, collision detected
            for (const corner of corners) {
                const dx = corner.x - cx;
                const dy = corner.y - cy;
                if (Math.sqrt(dx * dx + dy * dy) <= r) {
                    return true;
                }
            }
            
            // Check if button center is inside expanded joystick area
            if (cx >= x - buttonMargin && cx <= x + JOYSTICK.WIDTH + buttonMargin && 
                cy >= y - buttonMargin && cy <= y + JOYSTICK.HEIGHT + buttonMargin) {
                return true;
            }
        } else if (component.getAttribute('data-type') === 'joystick') {
            const rect = component.querySelector('rect');
            if (!rect) continue;
            
            const otherX = parseFloat(rect.getAttribute('x'));
            const otherY = parseFloat(rect.getAttribute('y'));
            
            // Rectangle overlap check with reduced margin for joysticks
            if (!(x + JOYSTICK.WIDTH + joystickMargin < otherX - joystickMargin || 
                  x - joystickMargin > otherX + JOYSTICK.WIDTH + joystickMargin || 
                  y + JOYSTICK.HEIGHT + joystickMargin < otherY - joystickMargin || 
                  y - joystickMargin > otherY + JOYSTICK.HEIGHT + joystickMargin)) {
                return true;
            }
        }
    }
    
    return false;
}

function deleteSelected() {
    if (selectedElement) {
        // Store reference to all current outlines before removal
        const outlines = Array.from(svg.querySelectorAll('.merged-outline'));
        
        // Remove from components array first
        const index = components.indexOf(selectedElement);
        if (index > -1) {
            components.splice(index, 1);
        }
        
        // Force remove ALL outlines
        outlines.forEach(outline => {
            try {
                outline.remove();
            } catch (e) {
                console.log('Outline already removed');
            }
        });
        
        // Force remove the selected element
        try {
            selectedElement.remove();
        } catch (e) {
            console.log('Element already removed');
        }
        
        // Clear selection
        selectedElement = null;
        
        // Final cleanup and redraw
        requestAnimationFrame(() => {
            // Double check no lingering outlines
            const remainingOutlines = svg.querySelectorAll('.merged-outline');
            remainingOutlines.forEach(outline => outline.remove());
            
            // Create new merged outline only if we have button components
            const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
            if (buttons.length > 0) {
                const mergedPath = generateMergedPath();
                if (mergedPath) {
                    mergedPath.classList.add('merged-outline');
                    mergedPath.setAttribute('fill', 'none');
                    mergedPath.setAttribute('stroke', 'black');
                    mergedPath.setAttribute('stroke-width', '141.11');
                    svg.insertBefore(mergedPath, svg.firstChild);
                }
            }
        });
    }
}

function forceRedrawMergedOutline() {
    removeAllOutlines();
    updateMergedOutline();
}

function updateMergedOutline() {
    removeAllOutlines();
    const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length > 0) {
        const mergedPath = generateMergedPath();
        if (mergedPath) {
            mergedPath.classList.add('merged-outline');
            mergedPath.setAttribute('fill', 'none');
            mergedPath.setAttribute('stroke', 'black');
            mergedPath.setAttribute('stroke-width', '141.11');
            svg.insertBefore(mergedPath, svg.firstChild);
        }
    }
}

function updateButtonPosition(component, newX, newY) {
    const circle = component.querySelector('circle:not(.margin-circle)');
    const marginCircle = component.querySelector('.margin-circle');
    
    if (circle && marginCircle) {
        removeAllOutlines();
        
        // Update positions
        circle.setAttribute('cx', newX);
        circle.setAttribute('cy', newY);
        marginCircle.setAttribute('cx', newX);
        marginCircle.setAttribute('cy', newY);
        
        // Force immediate outline update
        updateMergedOutline();
    }
}

function updateJoystickPosition(joystick, newX, newY) {
    const rect = joystick.querySelector('rect');
    if (!rect) return;
    
    // Get current position for calculating deltas
    const currentX = parseFloat(rect.getAttribute('x'));
    const currentY = parseFloat(rect.getAttribute('y'));
    const dx = newX - currentX;
    const dy = newY - currentY;
    
    // Update rectangle position (top-left based)
    rect.setAttribute('x', newX);
    rect.setAttribute('y', newY);
    
    // Update center hole position
    const centerHole = joystick.querySelector('circle[r="1500"]');
    if (centerHole) {
        const centerX = newX + JOYSTICK.WIDTH / 2;
        const centerY = newY + JOYSTICK.HEIGHT / 2;
        centerHole.setAttribute('cx', centerX);
        centerHole.setAttribute('cy', centerY);
    }
    
    // Update mounting holes
    const mountingHoles = joystick.querySelectorAll('circle[r="300"]');
    const holeMargin = 1000; // 10mm from edges
    
    const holePositions = [
        { x: newX + holeMargin, y: newY + holeMargin }, // Top-left
        { x: newX + JOYSTICK.WIDTH - holeMargin, y: newY + holeMargin }, // Top-right
        { x: newX + holeMargin, y: newY + JOYSTICK.HEIGHT - holeMargin }, // Bottom-left
        { x: newX + JOYSTICK.WIDTH - holeMargin, y: newY + JOYSTICK.HEIGHT - holeMargin } // Bottom-right
    ];
    
    mountingHoles.forEach((hole, index) => {
        const pos = holePositions[index];
        hole.setAttribute('cx', pos.x);
        hole.setAttribute('cy', pos.y);
    });
}

function findValidButtonPosition(size) {
    console.log('Finding valid position for button with size:', size);
    const radius = size / 2;
    const innerBoundary = document.getElementById('inner-boundary');
    const bbox = innerBoundary.getBBox();
    console.log('Inner boundary bbox:', bbox);
    
    // Define potential spawn positions in order of preference
    const spawnPositions = [
        { x: 20000, y: 15000, desc: 'Center' },
        { x: 15000, y: 15000, desc: 'Left Center' },
        { x: 25000, y: 15000, desc: 'Right Center' },
        { x: 20000, y: 10000, desc: 'Top Center' },
        { x: 20000, y: 20000, desc: 'Bottom Center' },
        { x: 15000, y: 10000, desc: 'Top Left' },
        { x: 25000, y: 10000, desc: 'Top Right' },
        { x: 15000, y: 20000, desc: 'Bottom Left' },
        { x: 25000, y: 20000, desc: 'Bottom Right' }
    ];
    
    // Try each predefined position first
    for (const pos of spawnPositions) {
        console.log(`Testing position: ${pos.desc}`, { x: pos.x, y: pos.y });
        
        if (isValidPosition(pos.x, pos.y, radius)) {
            console.log(`Found valid position at ${pos.desc}:`, { x: pos.x, y: pos.y });
            return { x: pos.x, y: pos.y };
        }
    }
    
    console.log('No predefined position available, trying optimized grid pattern');
    
    // Use a tighter grid pattern with overlap checking
    const gridSize = size + SAFETY_MARGIN; // Reduced grid size for tighter packing
    const margin = SAFETY_MARGIN;
    
    // Define search area with padding
    const startX = bbox.x + radius + margin;
    const startY = bbox.y + radius + margin;
    const endX = bbox.x + bbox.width - radius - margin;
    const endY = bbox.y + bbox.height - radius - margin;
    
    // Try positions in a tighter grid pattern
    for (let y = startY; y <= endY; y += gridSize / 2) { // Overlap rows by half
        for (let x = startX; x <= endX; x += gridSize / 2) { // Overlap columns by half
            console.log('Testing grid position:', { x, y });
            
            if (isValidPosition(x, y, radius)) {
                console.log('Found valid grid position:', { x, y });
                return { x, y };
            }
        }
    }
    
    // If still no position found, try an even finer grid as last resort
    console.log('Trying fine grid pattern');
    const fineGridSize = gridSize / 3; // Even finer grid
    
    for (let y = startY; y <= endY; y += fineGridSize) {
        for (let x = startX; x <= endX; x += fineGridSize) {
            if (isValidPosition(x, y, radius)) {
                console.log('Found valid position in fine grid:', { x, y });
                return { x, y };
            }
        }
    }
    
    console.warn('Could not find any valid position for button');
    return null;
}

function findValidJoystickPosition() {
    // Get the inner frame path for boundary checking
    const innerFrame = document.querySelector('.inner-stroke');
    if (!innerFrame) return null;
    
    // Calculate valid ranges with optimized margins
    const validRanges = [
        // Main area (excluding notch)
        {
            startX: FRAME.LEFT + JOYSTICK.MARGIN,
            endX: FRAME.NOTCH.X - JOYSTICK.WIDTH - JOYSTICK.MARGIN,
            startY: FRAME.TOP + JOYSTICK.MARGIN,
            endY: FRAME.NOTCH.Y - JOYSTICK.HEIGHT - JOYSTICK.MARGIN
        },
        // Area below the notch
        {
            startX: FRAME.NOTCH.X + JOYSTICK.MARGIN,
            endX: FRAME.RIGHT - JOYSTICK.WIDTH - JOYSTICK.MARGIN,
            startY: FRAME.NOTCH.Y + JOYSTICK.MARGIN,
            endY: FRAME.BOTTOM - JOYSTICK.HEIGHT - JOYSTICK.MARGIN
        }
    ];

    // Try each valid range
    for (const range of validRanges) {
        // Skip invalid ranges (where end < start)
        if (range.endX <= range.startX || range.endY <= range.startY) {
            console.log('Skipping invalid range:', range);
            continue;
        }
        
        console.log('Searching range:', {
            width: range.endX - range.startX,
            height: range.endY - range.startY,
            range
        });
        
        // Try corners first (optimization)
        const cornerPositions = [
            { x: range.startX, y: range.startY },  // Top-left
            { x: range.endX - JOYSTICK.GRID_STEP, y: range.startY },   // Top-right
            { x: range.startX, y: range.endY - JOYSTICK.GRID_STEP },   // Bottom-left
            { x: range.endX - JOYSTICK.GRID_STEP, y: range.endY - JOYSTICK.GRID_STEP }  // Bottom-right
        ];
        
        for (const pos of cornerPositions) {
            if (isValidJoystickPosition(pos.x, pos.y)) {
                console.log('Found valid corner position:', pos);
                return pos;
            }
        }
        
        // If corners don't work, try grid positions
        for (let y = range.startY; y <= range.endY; y += JOYSTICK.GRID_STEP) {
            for (let x = range.startX; x <= range.endX; x += JOYSTICK.GRID_STEP) {
                if (isValidJoystickPosition(x, y)) {
                    console.log('Found valid grid position:', { x, y });
                    return { x, y };
                }
            }
        }
    }
    
    console.log('No valid position found');
    return null;
}

function isValidJoystickPosition(x, y) {
    // Check if position is fully inside the inner frame
    const corners = [
        { x, y },
        { x: x + JOYSTICK.WIDTH, y },
        { x: x + JOYSTICK.WIDTH, y: y + JOYSTICK.HEIGHT },
        { x, y: y + JOYSTICK.HEIGHT }
    ];
    
    // If any corner is outside the boundary, position is invalid
    if (!corners.every(corner => isPointInsidePath(corner.x, corner.y))) {
        return false;
    }
    
    // Check for collisions with reduced margins
    return !checkJoystickCollision(null, x, y);
}

function isValidPosition(x, y, radius) {
    const testButton = document.createElementNS(SVG_NS, 'g');
    testButton.setAttribute('data-type', 'button');
    
    const testCircle = document.createElementNS(SVG_NS, 'circle');
    testCircle.setAttribute('cx', x);
    testCircle.setAttribute('cy', y);
    testCircle.setAttribute('r', radius);
    testButton.appendChild(testCircle);
    
    return isPointInsidePath(x, y) && !checkCollision(testButton, x, y);
}

// Helper function to remove all types of outlines
function removeAllOutlines() {
    const allOutlines = svg.querySelectorAll('.merged-outline, .preview-path, .merged-path');
    allOutlines.forEach(outline => {
        try {
            outline.remove();
        } catch (e) {
            console.log('Outline already removed:', e);
        }
    });
}

function updatePreviewPath() {
    removeAllOutlines();
    updateMergedOutline();
}

function getMousePosition(event) {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}

// Preview and Export Functions
function showPreview() {
    // Create preview window
    const previewWindow = window.open('', 'Layout Preview', 'width=800,height=600');
    const previewDoc = previewWindow.document;
    
    // Set up preview document
    previewDoc.title = 'Layout Preview';
    previewDoc.body.style.margin = '0';
    previewDoc.body.style.padding = '20px';
    previewDoc.body.style.backgroundColor = '#f0f0f0';
    
    // Add title
    const title = previewDoc.createElement('h1');
    title.textContent = 'Layout Preview';
    title.style.fontFamily = 'Arial, sans-serif';
    title.style.marginBottom = '20px';
    previewDoc.body.appendChild(title);
    
    // Create new SVG for preview
    const previewSvg = document.createElementNS(SVG_NS, 'svg');
    previewSvg.setAttribute('width', '100%');
    previewSvg.setAttribute('height', '100%');
    previewSvg.setAttribute('viewBox', '0 0 40000 30000');
    previewSvg.style.backgroundColor = 'white';
    previewSvg.style.border = '1px solid #ccc';
    previewDoc.body.appendChild(previewSvg);
    
    // Layer 1: Frame (background)
    const frame = svg.querySelector('.fil0.str0');
    if (frame) {
        const frameClone = frame.cloneNode(true);
        frameClone.setAttribute('fill', 'none');
        frameClone.setAttribute('stroke', 'black');
        frameClone.setAttribute('stroke-width', '141.11');
        previewSvg.appendChild(frameClone);
    }
    
    // Layer 2: Inner boundary
    const innerBoundary = svg.querySelector('.inner-stroke');
    if (innerBoundary) {
        const boundaryClone = innerBoundary.cloneNode(true);
        boundaryClone.setAttribute('stroke', 'red');
        boundaryClone.setAttribute('stroke-width', '141.11');
        boundaryClone.setAttribute('fill', 'none');
        previewSvg.appendChild(boundaryClone);
    }
    
    // Get all buttons
    const buttons = Array.from(svg.querySelectorAll('[data-type="button"]'));
    
    // Layer 3: Merged safety margin outline (behind circles)
    if (buttons.length > 0) {
        const mergedPath = generateCleanMergedPath();
        if (mergedPath) {
            mergedPath.setAttribute('fill', 'none');
            mergedPath.setAttribute('stroke', 'black');
            mergedPath.setAttribute('stroke-width', '141.11');
            previewSvg.appendChild(mergedPath);
        }
    }
    
    // Layer 4: Original button circles (on top)
    buttons.forEach(button => {
        // Get only the inner circle (not the margin circle)
        const circle = button.querySelector('circle:not(.margin-circle)');
        if (circle) {
            const circleClone = circle.cloneNode(true);
            circleClone.setAttribute('fill', 'none');
            circleClone.setAttribute('stroke', 'black');
            circleClone.setAttribute('stroke-width', '141.11');
            previewSvg.appendChild(circleClone);
        }
    });
    
    // Layer 5: Joysticks
    const joysticks = Array.from(svg.querySelectorAll('[data-type="joystick"]'));
    joysticks.forEach(joystick => {
        const joystickClone = joystick.cloneNode(true);
        joystickClone.querySelectorAll('*').forEach(element => {
            if (element.tagName.toLowerCase() === 'rect' || element.tagName.toLowerCase() === 'circle') {
                element.setAttribute('fill', 'none');
                element.setAttribute('stroke', 'black');
                element.setAttribute('stroke-width', '141.11');
            }
        });
        previewSvg.appendChild(joystickClone);
    });
    
    // Style preview window
    const style = previewDoc.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
        }
        svg {
            max-width: 100%;
            height: auto;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    `;
    previewDoc.head.appendChild(style);
}

function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

function downloadSvg() {
    const previewSvg = document.getElementById('previewSvg');
    
    // Create a clean copy of the SVG
    const cleanSvg = previewSvg.cloneNode(true);
    cleanSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Convert SVG to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(cleanSvg);
    
    // Create download link
    const blob = new Blob([svgString], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'joystick-layout.svg';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

// Initialize SVG click handler to deselect when clicking empty space
svg.addEventListener('click', function(e) {
    if (e.target === svg || e.target.id === 'inner-frame' || e.target.id === 'inner-boundary') {
        selectedElement = null;
        const selected = svg.querySelector('.selected');
        if (selected) selected.classList.remove('selected');
    }
});

function generateCleanMergedPath() {
    if (components.length === 0) return null;

    // Create paths for ClipperJS
    const clipPaths = [];
    const scale = 1000; // Higher scale for better precision
    
    // Only process buttons
    const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length === 0) return null;
    
    buttons.forEach(component => {
        const circle = component.querySelector('circle:not(.margin-circle)');
        if (!circle) return;

        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r')) + SAFETY_MARGIN;

        // Create points for a circle approximation
        const points = [];
        const numPoints = 180; // Increased point count for smoother circles
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            points.push({
                X: Math.round((cx + Math.cos(angle) * r) * scale),
                Y: Math.round((cy + Math.sin(angle) * r) * scale)
            });
        }

        clipPaths.push(points);
    });

    // Set up ClipperJS
    const cpr = new ClipperLib.Clipper();
    const solution = new ClipperLib.Paths();
    
    // Perform union operation
    cpr.AddPaths(clipPaths, ClipperLib.PolyType.ptSubject, true);
    cpr.Execute(ClipperLib.ClipType.ctUnion, solution, 
               ClipperLib.PolyFillType.pftNonZero, 
               ClipperLib.PolyFillType.pftNonZero);
    
    // Calculate minimum area threshold (based on smallest button's area)
    const minButtonRadius = Math.min(BUTTON_24MM, BUTTON_30MM) / 2;
    const minButtonArea = Math.PI * minButtonRadius * minButtonRadius * scale * scale * 0.25; // 25% of smallest button area
    
    // Create SVG path from the solution
    let pathData = '';
    solution.forEach(path => {
        const area = Math.abs(ClipperLib.Clipper.Area(path));
        
        // Skip tiny artifacts
        if (area < minButtonArea) return;
        
        // Start a new subpath
        path.forEach((point, index) => {
            const x = point.X / scale;
            const y = point.Y / scale;
            pathData += index === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
        });
        pathData += 'Z ';
    });
    
    // If we have a valid path, create and return the path element
    if (pathData) {
        const pathElement = document.createElementNS(SVG_NS, 'path');
        pathElement.setAttribute('d', pathData);
        return pathElement;
    }
    
    return null;
}
