// Constants for real-world measurements (in mm)
const BUTTON_24MM = 2400; // 24mm * 100 units per mm
const BUTTON_30MM = 3000; // 30mm * 100 units per mm
const SAFETY_MARGIN_24MM = 300;  // 3mm * 100 units per mm (for 24mm buttons)
const SAFETY_MARGIN_30MM = 275;  // 2.75mm * 100 units per mm (for 30mm buttons to reach 35.5mm total)
const OUTER_MARGIN_24MM = 375;  // 3.75mm * 100 units per mm (half of 7.5mm for 24mm buttons)
const OUTER_MARGIN_30MM = 375;  // 3.75mm * 100 units per mm (half of 7.5mm for 30mm buttons)
const SVG_NS = 'http://www.w3.org/2000/svg';

// SVG scaling constants
const UNITS_PER_MM = 100; // 1mm = 100 SVG units
const SVG_WIDTH = 40000;  // 400mm * 100 units per mm
const SVG_HEIGHT = 30000; // 300mm * 100 units per mm

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
        <path class="inner-stroke" d="M5768 2340c9488,-10 18976,-10 28464,0 262,1 523,1 785,2 287,1 537,51 786,199 252,149 465,375 658,593l6 7 6 7c103,132 207,263 304,399 259,359 514,721 767,1085l2 3 2 3c88,132 176,263 254,400 282,493 392,822 387,1396l0 3 -31 1069c-156,3986 -258,7974 -313,11963 -19,1389 -16,2778 -31,4168 -7,576 -90,942 -413,1430 -180,272 -374,531 -574,788 -208,268 -418,536 -629,802l-4 5 -89 104c-397,463 -818,872 -1466,896l-6 0 -5 0c-9752,8 -19504,8 -29256,0l-5 0 -6 0c-648,-24 -1069,-433 -1466,-896l-89 -104 -4 -5c-211,-266 -421,-534 -629,-802 -200,-257 -394,-516 -574,-788 -323,-488 -408,-855 -413,-1431 -7,-932 -14,-1863 -22,-2795 -13,-1482 -26,-2965 -55,-4448 -30,-1548 -77,-3095 -125,-4643 -44,-1414 -87,-2829 -142,-4244l-31 -1069 0 -3c-5,-574 105,-903 387,-1396 78,-137 166,-268 254,-400l2 -3 2 -3c253,-364 508,-726 767,-1085 97,-136 201,-267 304,-399l6 -7 6 -7c193,-218 406,-444 658,-593 249,-148 499,-198 786,-199 262,-1 523,-1 785,-2z"/>
    </g>
</svg>`;

canvasContainer.innerHTML = svgFrame;
const svg = canvasContainer.querySelector('svg');

// Frame boundary constants based on the SVG path
const FRAME = {
    LEFT: 5768,      // Left edge from path
    RIGHT: 34232,    // Right edge (40000 - 5768)
    TOP: 2340,       // Top edge from path
    BOTTOM: 27660,   // Bottom edge approximated from path
    NOTCH: {         // The notch on the right side
        X: 28000,    // X position where notch starts
        Y: 20000,    // Y position where notch starts
        WIDTH: 5000, // Width of the notch
        HEIGHT: 6000 // Height of the notch
    }
};

// Initialize variables
let selectedElement = null;
let components = [];
let offset = { x: 0, y: 0 };

// Add event listeners to buttons
document.getElementById('add24mm').addEventListener('click', () => addButton(BUTTON_24MM));
document.getElementById('add30mm').addEventListener('click', () => addButton(BUTTON_30MM));
document.getElementById('addJoystick').addEventListener('click', addJoystick);
document.getElementById('delete').addEventListener('click', deleteSelected);
document.getElementById('generateLayout').addEventListener('click', generateLayout);

// Add these variables at the top with other global variables
let isSelecting = false;
let selectionBox = null;
let selectionStart = { x: 0, y: 0 };
let selectedComponents = new Set();

// Add this function to create the selection box
function createSelectionBox(x, y) {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'selection-box');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', 0);
    rect.setAttribute('height', 0);
    svg.appendChild(rect);
    return rect;
}

// Add this function to update the selection box
function updateSelectionBox(box, startX, startY, endX, endY) {
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    box.setAttribute('x', x);
    box.setAttribute('y', y);
    box.setAttribute('width', width);
    box.setAttribute('height', height);
}

// Add this function to check if a component is inside the selection box
function isComponentInSelection(component, box) {
    const circle = component.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
    if (!circle) return false;
    
    const cx = parseFloat(circle.getAttribute('cx'));
    const cy = parseFloat(circle.getAttribute('cy'));
    const boxX = parseFloat(box.getAttribute('x'));
    const boxY = parseFloat(box.getAttribute('y'));
    const boxWidth = parseFloat(box.getAttribute('width'));
    const boxHeight = parseFloat(box.getAttribute('height'));
    
    return cx >= boxX && cx <= boxX + boxWidth && cy >= boxY && cy <= boxY + boxHeight;
}

// Modify the existing selectElement function to handle multi-select
function selectElement(element, addToSelection = false) {
    if (!addToSelection) {
        // Clear previous selection if not adding to it
        selectedComponents.forEach(comp => {
            comp.classList.remove('multi-selected');
        });
        selectedComponents.clear();
    }
    
    if (element) {
        selectedComponents.add(element);
        element.classList.add('multi-selected');
    }
    
    selectedElement = element; // Keep track of the last selected element
}

// Add this function to move all selected components
function moveSelectedComponents(dx, dy) {
    selectedComponents.forEach(component => {
        const type = component.getAttribute('data-type');
        if (type === 'button') {
            const circle = component.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
            if (circle) {
                const cx = parseFloat(circle.getAttribute('cx'));
                const cy = parseFloat(circle.getAttribute('cy'));
                updateButtonPosition(component, cx + dx, cy + dy);
            }
        } else if (type === 'joystick') {
            const x = parseFloat(component.getAttribute('x'));
            const y = parseFloat(component.getAttribute('y'));
            updateJoystickPosition(component, x + dx, y + dy);
        }
    });
}

// Modify the svg click handler to handle multi-select
svg.addEventListener('mousedown', function(e) {
    if (e.target === svg || e.target.id === 'inner-frame' || e.target.id === 'inner-boundary') {
        if (!e.shiftKey) {
            // Clear selection if not shift-clicking
            selectedComponents.forEach(comp => {
                comp.classList.remove('multi-selected');
            });
            selectedComponents.clear();
            selectedElement = null;
        }
        
        // Start selection box
        isSelecting = true;
        const point = getMousePosition(e);
        selectionStart = point;
        selectionBox = createSelectionBox(point.x, point.y);
    }
});

svg.addEventListener('mousemove', function(e) {
    if (isSelecting && selectionBox) {
        const point = getMousePosition(e);
        updateSelectionBox(selectionBox, selectionStart.x, selectionStart.y, point.x, point.y);
    }
});

svg.addEventListener('mouseup', function(e) {
    if (isSelecting && selectionBox) {
        // Find components inside selection box
        components.forEach(component => {
            if (isComponentInSelection(component, selectionBox)) {
                selectElement(component, true);
            }
        });
        
        // Remove selection box
        selectionBox.remove();
        selectionBox = null;
        isSelecting = false;
    }
});

// Add these variables at the top
let dragState = {
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    currentTransform: { x: 0, y: 0 },
    rafId: null
};

// Add this function to create a temporary group for dragging
function createDragGroup() {
    // First, hide all original components and remove existing merged outline
    selectedComponents.forEach(comp => {
        comp.style.opacity = '0';
        comp.setAttribute('data-dragging', 'true');
    });
    const oldMerged = svg.querySelector('.merged-path');
    if (oldMerged) oldMerged.remove();

    // Create the drag group
    const dragGroup = document.createElementNS(SVG_NS, 'g');
    dragGroup.setAttribute('class', 'drag-group');
    
    // Create and add merged outline first (so it's behind the components)
    const buttons = Array.from(selectedComponents).filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length > 0) {
        const mergedPath = generateCleanMergedPath(buttons);
        if (mergedPath) {
            mergedPath.setAttribute('class', 'merged-path');
            mergedPath.setAttribute('stroke', 'black');
            mergedPath.setAttribute('stroke-width', '141.11');
            mergedPath.setAttribute('fill', 'none');
            dragGroup.appendChild(mergedPath);
        }
    }
    
    // Then add component clones on top
    selectedComponents.forEach(comp => {
        const clone = comp.cloneNode(true);
        clone.setAttribute('data-dragging', 'true');
        if (selectedComponents.has(comp)) {
            clone.classList.add('multi-selected');
        }
        dragGroup.appendChild(clone);
    });
    
    svg.appendChild(dragGroup);
    return dragGroup;
}

// Update the drag behavior
function addDragBehavior(component) {
    let dragGroup = null;
    let isDragging = false;
    
    function onDragStart(e) {
        if (isDragging) return;
        
        // Clean up any stuck states before starting new drag
        cleanupStuckStates();
        
        if (!selectedComponents.has(component)) {
            if (!e.shiftKey) {
                selectedComponents.forEach(comp => {
                    comp.classList.remove('multi-selected');
                });
                selectedComponents.clear();
            }
            selectElement(component, e.shiftKey);
        }
        
        const point = getMousePosition(e);
        isDragging = true;
        dragState.isDragging = true;
        dragState.startX = dragState.lastX = point.x;
        dragState.startY = dragState.lastY = point.y;
        dragState.currentTransform = { x: 0, y: 0 };
        
        // Store initial positions
        selectedComponents.forEach(comp => {
            const circle = comp.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
            if (circle) {
                comp.dataset.initialX = circle.getAttribute('cx');
                comp.dataset.initialY = circle.getAttribute('cy');
            }
        });
        
        // Create drag group with components and outline
        dragGroup = createDragGroup();
        
        if (dragState.rafId) cancelAnimationFrame(dragState.rafId);
        dragState.rafId = requestAnimationFrame(updateDragAnimation);
    }
    
    function updateDragAnimation() {
        if (!isDragging || !dragGroup) return;
        
        const dx = dragState.lastX - dragState.startX;
        const dy = dragState.lastY - dragState.startY;
        
        // Check if movement would cause collision
        let canMove = true;
        selectedComponents.forEach(comp => {
            const initialX = parseFloat(comp.dataset.initialX || '0');
            const initialY = parseFloat(comp.dataset.initialY || '0');
            if (checkCollision(comp, initialX + dx, initialY + dy, comp)) {
                canMove = false;
            }
        });
        
        if (canMove) {
            dragState.currentTransform = { x: dx, y: dy };
            dragGroup.style.transform = `translate(${dx}px, ${dy}px)`;
        }
        
        dragState.rafId = requestAnimationFrame(updateDragAnimation);
    }
    
    function onDrag(e) {
        if (!isDragging) return;
        const point = getMousePosition(e);
        dragState.lastX = point.x;
        dragState.lastY = point.y;
    }
    
    function onDragEnd() {
        if (!isDragging) return;
        
        isDragging = false;
        dragState.isDragging = false;
        
        if (dragState.rafId) {
            cancelAnimationFrame(dragState.rafId);
            dragState.rafId = null;
        }
        
        // Apply final positions to original components
        selectedComponents.forEach(comp => {
            comp.style.opacity = '1';
            comp.removeAttribute('data-dragging');
            const circle = comp.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
            const marginCircle = comp.querySelector('.margin-circle');
            const outerMarginCircle = comp.querySelector('.outer-margin-circle');
            
            if (circle && marginCircle && outerMarginCircle) {
                const initialX = parseFloat(comp.dataset.initialX);
                const initialY = parseFloat(comp.dataset.initialY);
                const finalX = initialX + dragState.currentTransform.x;
                const finalY = initialY + dragState.currentTransform.y;
                
                circle.setAttribute('cx', finalX);
                circle.setAttribute('cy', finalY);
                marginCircle.setAttribute('cx', finalX);
                marginCircle.setAttribute('cy', finalY);
                outerMarginCircle.setAttribute('cx', finalX);
                outerMarginCircle.setAttribute('cy', finalY);
            }
        });
        
        // Remove drag group and update merged outline
        if (dragGroup) {
            svg.removeChild(dragGroup);
            dragGroup = null;
        }
        
        // Ensure selection state is correct and update outline
        selectedComponents.forEach(comp => {
            comp.classList.add('multi-selected');
        });
        forceRedrawMergedOutline();
    }
    
    // Add window blur handler to cleanup if window loses focus
    window.addEventListener('blur', () => {
        if (isDragging) {
            onDragEnd();
        }
    });
    
    component.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
    
    return () => {
        component.removeEventListener('mousedown', onDragStart);
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('blur', onDragEnd);
        if (dragState.rafId) {
            cancelAnimationFrame(dragState.rafId);
            dragState.rafId = null;
        }
    };
}

// Add cleanup function to handle any stuck states
function cleanupStuckStates() {
    // Remove any leftover drag groups
    const dragGroups = svg.querySelectorAll('.drag-group');
    dragGroups.forEach(group => group.remove());
    
    // Reset opacity and dragging state on all components
    components.forEach(comp => {
        comp.style.opacity = '1';
        comp.style.transform = '';
        comp.removeAttribute('data-dragging');
    });
    
    // Ensure selection highlighting is correct
    components.forEach(comp => {
        if (selectedComponents.has(comp)) {
            comp.classList.add('multi-selected');
        } else {
            comp.classList.remove('multi-selected');
        }
    });
}

// Update the checkCollision function to ignore components being dragged
function checkCollision(component, newX, newY, ignoreComponent = null) {
    // Skip collision check for components being dragged
    if (component.getAttribute('data-dragging') === 'true') return false;
    
    const type = component.getAttribute('data-type');
    if (type === 'button') {
        const circle = component.querySelector('.margin-circle');
        if (!circle) return false;
        
        const radius = parseFloat(circle.getAttribute('r'));
        const currentX = parseFloat(circle.getAttribute('cx'));
        const currentY = parseFloat(circle.getAttribute('cy'));
        
        // Check collision with inner boundary
        const innerBoundary = svg.querySelector('.inner-stroke');
        if (innerBoundary) {
            const bbox = innerBoundary.getBBox();
            if (newX - radius < bbox.x || 
                newX + radius > bbox.x + bbox.width ||
                newY - radius < bbox.y || 
                newY + radius > bbox.y + bbox.height) {
                return true;
            }
        }
        
        // Check collision with other components
        for (const other of components) {
            if (other === component || 
                other === ignoreComponent || 
                other.getAttribute('data-dragging') === 'true' ||
                selectedComponents.has(other)) {
                continue;
            }
            
            const otherType = other.getAttribute('data-type');
            if (otherType === 'button') {
                const otherCircle = other.querySelector('.margin-circle');
                if (!otherCircle) continue;
                
                const otherRadius = parseFloat(otherCircle.getAttribute('r'));
                const otherX = parseFloat(otherCircle.getAttribute('cx'));
                const otherY = parseFloat(otherCircle.getAttribute('cy'));
                
                const dx = newX - otherX;
                const dy = newY - otherY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < radius + otherRadius) {
                    return true;
                }
            }
        }
    }
    return false;
}

function onDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    dragState.isDragging = false;
    
    if (dragState.rafId) {
        cancelAnimationFrame(dragState.rafId);
        dragState.rafId = null;
    }
    
    // Calculate final delta based on mouse position
    const dx = dragState.lastX - dragState.startX;
    const dy = dragState.lastY - dragState.startY;
    
    // Check for collisions at final position
    let hasCollision = false;
    selectedComponents.forEach(comp => {
        const initialX = parseFloat(comp.dataset.initialX);
        const initialY = parseFloat(comp.dataset.initialY);
        const finalX = initialX + dx;
        const finalY = initialY + dy;
        
        if (checkCollision(comp, finalX, finalY)) {
            hasCollision = true;
        }
    });
    
    // Apply positions or revert based on collision check
    selectedComponents.forEach(comp => {
        comp.style.opacity = '1';
        comp.removeAttribute('data-dragging');
        comp.style.transform = '';
        
        const circle = comp.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
        const marginCircle = comp.querySelector('.margin-circle');
        const outerMarginCircle = comp.querySelector('.outer-margin-circle');
        
        if (circle && marginCircle && outerMarginCircle) {
            const initialX = parseFloat(comp.dataset.initialX);
            const initialY = parseFloat(comp.dataset.initialY);
            
            // Set final or initial position based on collision check
            const finalX = hasCollision ? initialX : initialX + dx;
            const finalY = hasCollision ? initialY : initialY + dy;
            
            circle.setAttribute('cx', finalX);
            circle.setAttribute('cy', finalY);
            marginCircle.setAttribute('cx', finalX);
            marginCircle.setAttribute('cy', finalY);
            outerMarginCircle.setAttribute('cx', finalX);
            outerMarginCircle.setAttribute('cy', finalY);
            
            // Clean up temporary attributes
            comp.removeAttribute('data-initialX');
            comp.removeAttribute('data-initialY');
        }
    });
    
    // Remove drag group
    if (dragGroup) {
        svg.removeChild(dragGroup);
        dragGroup = null;
    }
    
    // Ensure selection state is correct and create new merged outline
    selectedComponents.forEach(comp => {
        comp.classList.add('multi-selected');
    });
    
    // Create fresh merged outline
    forceRedrawMergedOutline();
}

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
        const circle = component.querySelector('.outer-margin-circle');
        if (!circle) return;

        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r'));

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

    // Special case: If there's only one button, create the outer circle directly
    if (clipPaths.length === 1) {
        const circle = buttons[0].querySelector('.outer-margin-circle');
        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r'));

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

function isPointInsidePath(x, y) {
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    
    // Get the black fill path
    const blackPath = svg.querySelector('.fil0');
    if (!blackPath) return false;
    
    // Create a temporary point for testing
    const testPoint = svg.createSVGPoint();
    testPoint.x = x;
    testPoint.y = y;
    
    // Get the current transformation matrix and its inverse
    const matrix = blackPath.getScreenCTM();
    if (matrix) {
        const inverse = matrix.inverse();
        testPoint.matrixTransform(inverse);
    }
    
    // Return true if point is NOT in the black area
    return !blackPath.isPointInFill(point);
}

function checkCollision(component, newX, newY) {
    const circle = component.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
    if (!circle) return true; // If we can't find the circle, assume collision
    
    const radius = parseFloat(circle.getAttribute('r'));
    const size = parseInt(component.getAttribute('data-size'));
    const safetyMargin = size === BUTTON_24MM ? SAFETY_MARGIN_24MM : SAFETY_MARGIN_30MM;
    const marginRadius = radius + safetyMargin;
    
    // Check if any point of the margin circle would be outside the boundary
    const numPoints = 16; // Check points around the margin circle
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * Math.PI * 2) / numPoints;
        const pointX = newX + Math.cos(angle) * marginRadius;
        const pointY = newY + Math.sin(angle) * marginRadius;
        
        if (!isPointInsidePath(pointX, pointY)) {
            return true;
        }
    }
    
    // Check collision with other components
    for (const other of components) {
        if (other === component) continue;
        
        if (other.getAttribute('data-type') === 'button') {
            const otherMarginCircle = other.querySelector('.margin-circle');
            if (!otherMarginCircle) continue; // Skip if we can't find the margin circle
            
            const otherX = parseFloat(otherMarginCircle.getAttribute('cx'));
            const otherY = parseFloat(otherMarginCircle.getAttribute('cy'));
            const otherRadius = parseFloat(otherMarginCircle.getAttribute('r'));
            
            const dx = newX - otherX;
            const dy = newY - otherY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Add a small buffer (0.1 units) to detect collision exactly when circles touch
            if (distance <= marginRadius + otherRadius + 0.1) {
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

function updateButtonPosition(component, newX, newY) {
    const circle = component.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
    const marginCircle = component.querySelector('.margin-circle');
    const outerMarginCircle = component.querySelector('.outer-margin-circle');
    
    if (circle && marginCircle && outerMarginCircle) {
        removeAllOutlines();
        
        // Update positions
        circle.setAttribute('cx', newX);
        circle.setAttribute('cy', newY);
        marginCircle.setAttribute('cx', newX);
        marginCircle.setAttribute('cy', newY);
        outerMarginCircle.setAttribute('cx', newX);
        outerMarginCircle.setAttribute('cy', newY);
        
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
    
    const position = findValidPosition(size);
    if (!position) {
        console.error('No valid position found for button');
        alert('No space available for new button');
        return null;
    }
    
    return position;
}

function findValidPosition(size) {
    console.log('Finding valid position for size:', size);
    
    const radius = size / 2;
    const innerBoundary = svg.querySelector('.inner-stroke');
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
    const gridSize = size + SAFETY_MARGIN_24MM; // Reduced grid size for tighter packing
    const margin = SAFETY_MARGIN_24MM;
    
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
    const innerFrame = svg.querySelector('.inner-stroke');
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
    // Create a temporary test component
    const testButton = document.createElementNS(SVG_NS, 'g');
    testButton.setAttribute('data-type', 'button');
    
    const testCircle = document.createElementNS(SVG_NS, 'circle');
    testCircle.setAttribute('class', 'margin-circle');
    testCircle.setAttribute('cx', x);
    testCircle.setAttribute('cy', y);
    testCircle.setAttribute('r', radius);
    testButton.appendChild(testCircle);
    
    // Check if point is inside the boundary path and no collisions with existing components
    return !checkCollision(testButton, x, y);
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
    
    // Create new SVG for preview with real-world dimensions
    const previewSvg = document.createElementNS(SVG_NS, 'svg');
    previewSvg.setAttribute('xmlns', SVG_NS);
    previewSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    previewSvg.setAttribute('width', '400mm');
    previewSvg.setAttribute('height', '300mm');
    previewSvg.setAttribute('viewBox', '0 0 40000 30000');
    previewSvg.setAttribute('style', 'shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd');
    previewDoc.body.appendChild(previewSvg);
    
    // Add style definitions
    const defs = document.createElementNS(SVG_NS, 'defs');
    const style = document.createElementNS(SVG_NS, 'style');
    style.setAttribute('type', 'text/css');
    style.textContent = `
        .str0 {stroke:black;stroke-width:141.11}
        .fil0 {fill:white}
        .inner-frame {fill:none;stroke:none;pointer-events:all}
        .inner-stroke {stroke:red;stroke-width:141.11;fill:none}
    `;
    defs.appendChild(style);
    previewSvg.appendChild(defs);
    
    // Create main group
    const mainGroup = document.createElementNS(SVG_NS, 'g');
    mainGroup.setAttribute('id', 'Livello_x0020_1');
    previewSvg.appendChild(mainGroup);
    
    // Layer 1: Frame (background) with original complex path
    const frame = svg.querySelector('.fil0.str0');
    if (frame) {
        const frameClone = frame.cloneNode(true);
        frameClone.setAttribute('fill', 'white');
        frameClone.setAttribute('stroke', 'black');
        frameClone.setAttribute('stroke-width', '141.11');
        mainGroup.appendChild(frameClone);
    }
    
    // Layer 2: Inner boundary with original path
    const innerBoundary = svg.querySelector('.inner-stroke');
    if (innerBoundary) {
        const boundaryClone = innerBoundary.cloneNode(true);
        boundaryClone.setAttribute('stroke', 'red');
        boundaryClone.setAttribute('stroke-width', '141.11');
        boundaryClone.setAttribute('fill', 'none');
        mainGroup.appendChild(boundaryClone);
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
            mainGroup.appendChild(mergedPath);
        }
    }
    
    // Layer 4: Original button circles (on top)
    buttons.forEach(button => {
        const circle = button.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
        if (circle) {
            const circleClone = circle.cloneNode(true);
            circleClone.setAttribute('fill', 'none');
            circleClone.setAttribute('stroke', 'black');
            circleClone.setAttribute('stroke-width', '141.11');
            mainGroup.appendChild(circleClone);
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
        mainGroup.appendChild(joystickClone);
    });
    
    // Create button wrapper
    const buttonWrapper = previewDoc.createElement('div');
    buttonWrapper.style.marginTop = '20px';
    buttonWrapper.style.textAlign = 'center';
    previewDoc.body.appendChild(buttonWrapper);
    
    // Create Download SVG button
    const downloadBtn = previewDoc.createElement('button');
    downloadBtn.textContent = 'Download SVG';
    downloadBtn.style.marginRight = '10px';
    downloadBtn.style.padding = '8px 16px';
    downloadBtn.style.fontSize = '14px';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.onclick = function() {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(previewSvg);
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const downloadLink = previewDoc.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'joystick-layout.svg';
        downloadLink.click();
        URL.revokeObjectURL(url);
    };
    buttonWrapper.appendChild(downloadBtn);
    
    // Create Close button
    const closeBtn = previewDoc.createElement('button');
    closeBtn.textContent = 'Close Preview';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.fontSize = '14px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = function() {
        previewWindow.close();
    };
    buttonWrapper.appendChild(closeBtn);
    
    // Style preview window
    const docStyle = previewDoc.createElement('style');
    docStyle.textContent = `
        body {
            font-family: Arial, sans-serif;
        }
        svg {
            max-width: 100%;
            height: auto;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            background-color: white;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        button:hover {
            background-color: #0056b3;
        }
    `;
    previewDoc.head.appendChild(docStyle);
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

function generateCleanMergedPath(buttons) {
    if (buttons.length === 0) return null;

    // Create paths for ClipperJS
    const clipPaths = [];
    const scale = 1000; // Higher scale for better precision
    
    buttons.forEach(component => {
        const circle = component.querySelector('.outer-margin-circle');
        if (!circle) return;

        const cx = parseFloat(circle.getAttribute('cx'));
        const cy = parseFloat(circle.getAttribute('cy'));
        const r = parseFloat(circle.getAttribute('r'));

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
    const minButtonArea = Math.PI * minButtonRadius * minButtonRadius * scale * scale;
    
    // Keep all valid paths (above minimum area)
    const validPaths = solution.filter(path => {
        const area = Math.abs(ClipperLib.Clipper.Area(path));
        return area >= minButtonArea;
    });
    
    if (validPaths.length > 0) {
        // Create a single path element with all valid paths
        let pathData = '';
        validPaths.forEach(path => {
            path.forEach((point, index) => {
                const x = point.X / scale;
                const y = point.Y / scale;
                pathData += index === 0 ? `M ${x},${y} ` : `L ${x},${y} `;
            });
            pathData += 'Z '; // Close each subpath
        });
        
        const pathElement = document.createElementNS(SVG_NS, 'path');
        pathElement.setAttribute('d', pathData);
        return pathElement;
    }
    
    return null;
}

function updateMergedOutline() {
    removeAllOutlines();
    const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length === 0) return;
    
    const mergedPath = generateCleanMergedPath(buttons);
    if (mergedPath) {
        mergedPath.setAttribute('class', 'merged-path');
        mergedPath.setAttribute('stroke', 'black');
        mergedPath.setAttribute('stroke-width', '141.11');
        mergedPath.setAttribute('fill', 'none');
        svg.appendChild(mergedPath);
    }
}

function getComponentRadius(component) {
    if (!component) return 0;
    
    if (component.getAttribute('data-type') === 'button') {
        const marginCircle = component.querySelector('.margin-circle');
        if (!marginCircle) return 0;
        return parseFloat(marginCircle.getAttribute('r'));
    }
    return 0;
}

function checkCollision(component, newX, newY) {
    // Get component radius
    const radius = getComponentRadius(component);
    if (radius === 0) return false;
    
    // Check frame boundaries
    const innerBoundary = svg.querySelector('.inner-stroke');
    if (innerBoundary) {
        const bbox = innerBoundary.getBBox();
        if (newX - radius < bbox.x || 
            newX + radius > bbox.x + bbox.width ||
            newY - radius < bbox.y || 
            newY + radius > bbox.y + bbox.height) {
            return true;
        }
    }

    // Check against other components
    let collision = false;
    components.forEach(other => {
        if (other === component || selectedComponents.has(other)) return;
        
        if (other.getAttribute('data-type') === 'button') {
            const otherRadius = getComponentRadius(other);
            if (otherRadius === 0) return;
            
            const marginCircle = other.querySelector('.margin-circle');
            if (!marginCircle) return;
            
            const otherX = parseFloat(marginCircle.getAttribute('cx'));
            const otherY = parseFloat(marginCircle.getAttribute('cy'));
            
            const distance = Math.sqrt(
                Math.pow(newX - otherX, 2) + 
                Math.pow(newY - otherY, 2)
            );
            
            if (distance < radius + otherRadius) {
                collision = true;
            }
        }
    });
    
    return collision;
}

function onDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    dragState.isDragging = false;
    
    if (dragState.rafId) {
        cancelAnimationFrame(dragState.rafId);
        dragState.rafId = null;
    }

    // Calculate final positions for all selected components
    const dx = dragState.lastX - dragState.startX;
    const dy = dragState.lastY - dragState.startY;
    
    // Create virtual positions map
    const virtualPositions = new Map();
    selectedComponents.forEach(comp => {
        const initialX = parseFloat(comp.dataset.initialX);
        const initialY = parseFloat(comp.dataset.initialY);
        virtualPositions.set(comp, {
            x: initialX + dx,
            y: initialY + dy
        });
    });

    // Check collisions against non-selected components and other virtual positions
    let hasCollision = false;
    selectedComponents.forEach(comp => {
        const virtual = virtualPositions.get(comp);
        
        // Check against non-selected components
        components.forEach(other => {
            if (selectedComponents.has(other) || other === comp) return;
            if (checkCollision(other, virtual.x, virtual.y)) {
                hasCollision = true;
            }
        });

        // Check against other virtual positions
        selectedComponents.forEach(other => {
            if (other === comp) return;
            const otherVirtual = virtualPositions.get(other);
            const distance = Math.sqrt(
                Math.pow(virtual.x - otherVirtual.x, 2) + 
                Math.pow(virtual.y - otherVirtual.y, 2)
            );
            const minDistance = getComponentRadius(comp) + getComponentRadius(other);
            
            if (distance < minDistance) {
                hasCollision = true;
            }
        });
    });

    // Update positions or revert
    selectedComponents.forEach(comp => {
        comp.style.opacity = '1';
        comp.removeAttribute('data-dragging');
        comp.style.transform = '';
        
        const virtual = virtualPositions.get(comp);
        const circle = comp.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
        const marginCircle = comp.querySelector('.margin-circle');
        const outerMarginCircle = comp.querySelector('.outer-margin-circle');

        if (circle && marginCircle && outerMarginCircle) {
            const finalX = hasCollision ? parseFloat(comp.dataset.initialX) : virtual.x;
            const finalY = hasCollision ? parseFloat(comp.dataset.initialY) : virtual.y;

            circle.setAttribute('cx', finalX);
            circle.setAttribute('cy', finalY);
            marginCircle.setAttribute('cx', finalX);
            marginCircle.setAttribute('cy', finalY);
            outerMarginCircle.setAttribute('cx', finalX);
            outerMarginCircle.setAttribute('cy', finalY);
            
            // Clean up temporary attributes
            comp.removeAttribute('data-initialX');
            comp.removeAttribute('data-initialY');
        }
    });

    // Remove drag group
    if (dragGroup) {
        svg.removeChild(dragGroup);
        dragGroup = null;
    }

    // Ensure selection state is correct and create new merged outline
    selectedComponents.forEach(comp => {
        comp.classList.add('multi-selected');
    });

    forceRedrawMergedOutline();
}

// Update createDragGroup to ensure complete cleanup
function createDragGroup() {
    // Remove ALL merged outlines first
    removeAllMergedOutlines();
    
    // Then hide original components
    selectedComponents.forEach(comp => {
        comp.style.opacity = '0';
        comp.setAttribute('data-dragging', 'true');
        // Also remove any existing transforms
        comp.style.transform = '';
    });

    // Create the drag group
    const dragGroup = document.createElementNS(SVG_NS, 'g');
    dragGroup.setAttribute('class', 'drag-group');
    
    // Create and add merged outline first (so it's behind the components)
    const buttons = Array.from(selectedComponents).filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length > 0) {
        const mergedPath = generateCleanMergedPath(buttons);
        if (mergedPath) {
            mergedPath.setAttribute('class', 'merged-path drag-merged-path');
            mergedPath.setAttribute('stroke', 'black');
            mergedPath.setAttribute('stroke-width', '141.11');
            mergedPath.setAttribute('fill', 'none');
            dragGroup.appendChild(mergedPath);
        }
    }
    
    // Then add component clones on top
    selectedComponents.forEach(comp => {
        const clone = comp.cloneNode(true);
        clone.setAttribute('data-dragging', 'true');
        // Reset any existing transforms on the clone
        clone.style.transform = '';
        if (selectedComponents.has(comp)) {
            clone.classList.add('multi-selected');
        }
        dragGroup.appendChild(clone);
    });
    
    svg.appendChild(dragGroup);
    return dragGroup;
}

// Update cleanupStuckStates to be more thorough
function cleanupStuckStates() {
    // Remove any leftover drag groups
    const dragGroups = svg.querySelectorAll('.drag-group');
    dragGroups.forEach(group => group.remove());
    
    // Remove any leftover merged outlines
    removeAllMergedOutlines();
    
    // Reset all components
    components.forEach(comp => {
        comp.style.opacity = '1';
        comp.style.transform = '';
        comp.removeAttribute('data-dragging');
        // Remove any temporary attributes we might have added
        comp.removeAttribute('data-initialX');
        comp.removeAttribute('data-initialY');
    });
    
    // Ensure selection highlighting is correct
    components.forEach(comp => {
        if (selectedComponents.has(comp)) {
            comp.classList.add('multi-selected');
        } else {
            comp.classList.remove('multi-selected');
        }
    });
    
    // Create a fresh merged outline for selected components
    forceRedrawMergedOutline();
}

// Update onDragEnd to ensure complete cleanup
function onDragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    dragState.isDragging = false;
    
    if (dragState.rafId) {
        cancelAnimationFrame(dragState.rafId);
        dragState.rafId = null;
    }
    
    // Remove ALL merged outlines first
    removeAllMergedOutlines();
    
    // Apply final positions to original components
    selectedComponents.forEach(comp => {
        comp.style.opacity = '1';
        comp.removeAttribute('data-dragging');
        comp.style.transform = '';
        const circle = comp.querySelector('circle:not(.margin-circle):not(.outer-margin-circle)');
        const marginCircle = comp.querySelector('.margin-circle');
        const outerMarginCircle = comp.querySelector('.outer-margin-circle');
        
        if (circle && marginCircle && outerMarginCircle) {
            const initialX = parseFloat(comp.dataset.initialX);
            const initialY = parseFloat(comp.dataset.initialY);
            const finalX = initialX + dragState.currentTransform.x;
            const finalY = initialY + dragState.currentTransform.y;
            
            circle.setAttribute('cx', finalX);
            circle.setAttribute('cy', finalY);
            marginCircle.setAttribute('cx', finalX);
            marginCircle.setAttribute('cy', finalY);
            outerMarginCircle.setAttribute('cx', finalX);
            outerMarginCircle.setAttribute('cy', finalY);
            
            // Clean up temporary attributes
            comp.removeAttribute('data-initialX');
            comp.removeAttribute('data-initialY');
        }
    });
    
    // Remove drag group
    if (dragGroup) {
        svg.removeChild(dragGroup);
        dragGroup = null;
    }
    
    // Ensure selection state is correct and create new merged outline
    selectedComponents.forEach(comp => {
        comp.classList.add('multi-selected');
    });
    
    // Create fresh merged outline
    forceRedrawMergedOutline();
}

// Update the updateMergedOutline function to be more thorough
function updateMergedOutline() {
    removeAllOutlines();
    const buttons = components.filter(c => c.getAttribute('data-type') === 'button');
    if (buttons.length === 0) return;
    
    const mergedPath = generateCleanMergedPath(buttons);
    if (mergedPath) {
        mergedPath.setAttribute('class', 'merged-path');
        mergedPath.setAttribute('stroke', 'black');
        mergedPath.setAttribute('stroke-width', '141.11');
        mergedPath.setAttribute('fill', 'none');
        svg.appendChild(mergedPath);
    }
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
    const safetyMargin = size === BUTTON_24MM ? SAFETY_MARGIN_24MM : SAFETY_MARGIN_30MM;
    const outerMargin = size === BUTTON_24MM ? OUTER_MARGIN_24MM : OUTER_MARGIN_30MM;
    console.log('Button radius:', radius);
    
    // Create the main button circle (innermost)
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', position.x);
    circle.setAttribute('cy', position.y);
    // Subtract half of stroke width (70.555 units = 0.70555mm) from radius to account for stroke thickness
    circle.setAttribute('r', radius - 70.555);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', '141.11');
    
    // Create the middle margin circle (for collision detection)
    const marginCircle = document.createElementNS(SVG_NS, 'circle');
    marginCircle.setAttribute('class', 'margin-circle');
    marginCircle.setAttribute('cx', position.x);
    marginCircle.setAttribute('cy', position.y);
    marginCircle.setAttribute('r', radius + safetyMargin);
    
    // Create the outer margin circle (7.5mm larger than inner circle)
    const outerMarginCircle = document.createElementNS(SVG_NS, 'circle');
    outerMarginCircle.setAttribute('class', 'outer-margin-circle');
    outerMarginCircle.setAttribute('cx', position.x);
    outerMarginCircle.setAttribute('cy', position.y);
    outerMarginCircle.setAttribute('r', radius + outerMargin);
    
    button.appendChild(marginCircle);        // Add middle circle first (bottom layer)
    button.appendChild(outerMarginCircle);   // Add outer circle second
    button.appendChild(circle);              // Add innermost circle last (top layer)
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

// Add this function to remove all merged outlines
function removeAllMergedOutlines() {
    const mergedPaths = svg.querySelectorAll('.merged-path');
    mergedPaths.forEach(path => path.remove());
}