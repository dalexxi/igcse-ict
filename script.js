document.addEventListener("DOMContentLoaded", function(){
    loadData();
});

function loadData(){
    fetch('data.json')
        .then(response => response.json())
        .then(data => loadContent(data))
        .catch(error => console.error('Error Loading Data: ', error));
}

function loadContent(data) {
    var html = '';
    data.forEach(category => {
        html += '<div class="category"><h1>' + category.title + '</h1>';

        category.terms.forEach(term => {
            html += '<div class = "accordion-label"><h2>' + term.termTitle + '</h2></div>';
            html += '<div class = "accordion">';

            term.units.forEach(unit => {
                html += '<div class="unit-label"><h3>' + unit.unitTitle + '</h3></div>';
                html += '<div class="unit-accordion">';

                unit.lessons.forEach(lesson => {
                    if(lesson.contents && lesson.contents.length >0){
                        html += '<div class="lesson-label"><h4>' + lesson.lessonTitle + '</h4></div>';
                        html += '<div class="lesson-accordion">';
                            
                        lesson.contents.forEach(subLesson => {
                            html += '<h5><a href="' + subLesson.link + '">' + subLesson.subLessonTitle + '</h5></p>';
                        });
                        html += '</div>'; //lesson - accordion
                    }
                    else{
                        html += '<h4><a href="' + lesson.link + '">' + lesson.lessonTitle + '</h4></p>';
                    }
                });
                html += '</div>'; //unit - accordion
            });
            html += '</div>'; //close accordion
        });
        html += '</div>'; //close category
    });

    document.getElementById("content").innerHTML = html;
    attachAccordionEvents();
}

function attachAccordionEvents(){
    document.getElementById("content").addEventListener("click", function(e) {
        var accordionLabel = e.target.classList.contains("accordion-label") 
                             ? e.target 
                             : e.target.closest('.accordion-label');
        if (accordionLabel) {
            toggleAccordion(accordionLabel.nextElementSibling);
            return;
        }

        var unitLabel = e.target.classList.contains("unit-label") 
                        ? e.target 
                        : e.target.closest('.unit-label');
        if (unitLabel) {
            toggleSubAccordion(unitLabel.nextElementSibling);
        }

        var lessonLabel = e.target.classList.contains("lesson-label") 
                          ? e.target 
                          : e.target.closest('.lesson-label');
        if (lessonLabel) {
            toggleLessonAccordion(lessonLabel.nextElementSibling);
        }

        var subLessonLabel = e.target.classList.contains("sublesson-label") 
                             ? e.target 
                             : e.target.closest('.sublesson-label');
        if (subLessonLabel) {
            toggleSubLessonAccordion(subLessonLabel.nextElementSibling);
        }
    });
}

function toggleAccordion(accordion) {
    var display = accordion.style.display;
    document.querySelectorAll('.accordion').forEach(function(el) {
        el.style.display = 'none';
    });
    accordion.style.display = display === 'block' ? 'none' : 'block';
}

function toggleSubAccordion(unitAccordion) {
    var display = unitAccordion.style.display;
    var siblings = unitAccordion.parentElement.querySelectorAll('.unit-accordion');
    siblings.forEach(function(el) {
        el.style.display = 'none';
    });
    unitAccordion.style.display = display === 'block' ? 'none' : 'block';
}

function toggleLessonAccordion(lessonAccordion) {
    var display = lessonAccordion.style.display;
    var siblings = lessonAccordion.parentElement.querySelectorAll('.lesson-accordion');
    siblings.forEach(function(el) {
        el.style.display = 'none';
    });
    lessonAccordion.style.display = display === 'block' ? 'none' : 'block';
}

function toggleSubLessonAccordion(subLessonAccordion) {
    var display = subLessonAccordion.style.display;
    var siblings = subLessonAccordion.parentElement.querySelectorAll('.sublesson-accordion');
    siblings.forEach(function(el) {
        el.style.display = 'none';
    });
    subLessonAccordion.style.display = display === 'block' ? 'none' : 'block';
}
