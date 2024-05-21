$(document).ready(function () {
    // Open the modal
    $("#openModal").click(function () {
        $("#createSection").removeClass("hidden");
    });

    // Close the modal
    $("#cancelButton").click(function () {
        $("#createSection").addClass("hidden");
    });

    // Save button functionality
    $("#saveButton").click(function () {
        let name = $("#nameInput").val();
        if (name === "") {
            toastr.error('Section name cannot be empty');
            return false;
        }
        let noOfChildren = $(".editor-pane").children().length / 2;
        let editableLength = $('.right-lower.main-content .editable').children().length;
        let previewIndex;
        if (editableLength == 0) {
            previewIndex = $(".right-lower.main-content").children().length;
        }
        else {
            previewIndex = editableLength + $(".right-lower.main-content").children().length;
        }
        addSection(name, noOfChildren, previewIndex)
        $("#createSection").addClass("hidden");
    });

    $(document).on('click', '.create-button', function () {
        let action = $(this).attr('data-action');
        let accordionIndex = $(this).attr('data-accordion-target');
        let previewSection = $(this).attr('data-preview-section');
        addPointers(action, accordionIndex, previewSection);
    });
});
function addSection(sectionName, children, pIndex) {
    let index = children;
    let editor_template = `
    <h2 id="accordion-color-heading-${index}">
        <button type="button"
            class="accordion-heading flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-color-body-${index}" aria-expanded="false"
            aria-controls="accordion-color-body-${index}">
            <span>${sectionName}</span>
            <div class = "flex justify-end">
                <i id="delete-section" class="fa-solid fa-trash mr-3" data-accordion-target="${index}" data-preview-target="section-${pIndex}"></i>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5 5 1 1 5" />
                </svg>
            </div>
        </button>
    </h2>
    <div id="accordion-color-body-${index}" class="hidden" aria-labelledby="accordion-color-heading-${index}">
        <div class="accordion-inner p-5 border space-y-3 border-b-0 border-gray-200 dark:border-gray-700">
            <div class="creator-buttons space-x-2">
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-title" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Title</button>
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-adv-title" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Title+url+date</button>
                <button class="create-button border border-white text-white pl-1 pr-1 rounded" data-action="create-bullet" data-accordion-target="${index}" data-preview-section="section-${pIndex}"><i class="fa-solid fa-square-plus mr-2"></i>Bullet point</button>
            </div>            
    </div>
    `
    let preview_template = `
    <div class="section-${pIndex} flex justify-center">
        <div class="section-container h-[100%] w-[90%]">
            <h1
                class="section-title text-md font-bold mt-1 inline-block border-b-2 border-[#303c54]">
                ${sectionName.toUpperCase()}</h1>
        </div>
    </div>
    `
    $(".editor-pane").append(editor_template);
    $(".right-lower.main-content .editable").append(preview_template);
    toastr.success('Section created successfully');
}

function addPointers(action, accordionIndex, previewSection) {
    if (action == "create-title") {
        let title_index = $(`.right-lower.main-content .editable .${previewSection} .section-container`).children('.title').length + 1;
        let title_template = `
        <p class="title title-${title_index} text-xs font-bold mt-2">
            <span id="${previewSection}-title-${title_index}">Your Title</span>
        </p>
        `
        let title_editor_template = `
        <div class="space-y-1">
            <label for="title-${title_index}">Title ${title_index}:</label>
            <input type="text" id="title-${title_index}" class="editor-field text-black" value="Your Title" data-target="#${previewSection}-title-${title_index}"
                placeholder="Enter a title" />
        </div>
        `

        $(`.right-lower.main-content .editable .${previewSection} .section-container`).append(title_template);
        $(`#accordion-color-body-${accordionIndex} .accordion-inner`).append(title_editor_template);
    }
    else if (action == "create-adv-title") {
        let adv_title_index = $(`.right-lower.main-content .editable .${previewSection} .section-container`).children('.adv-title').length + 1;
        let adv_title_template = `
        <p class="adv-title text-xs font-bold mt-2">
            <span id="${previewSection}-adv-title-${adv_title_index}">Your Title</span> |
            <a id="${previewSection}-adv-link-${adv_title_index}" class="text-blue-700 underline"
                href="https://google.com">https://google.com</a>
            | <span id="${previewSection}-adv-date-${adv_title_index}">Feb 2023</span>
        </p>
        `
        let adv_title_editor_template = `
        <div class="space-y-1">
            <label for="proglanguage">Advanced Title ${adv_title_index}:</label>
            <br>
            <label for="dbs">Title:</label>
            <input type="text" id="proglanguage1" class="editor-field text-black" data-target="#${previewSection}-adv-title-${adv_title_index}"
                placeholder="Enter a title" value="Your Title" />
            <br>
            <label for="dbs">Link:</label>
            <input type="text" id="proglanguage2" class="editor-field text-black" data-target="#${previewSection}-adv-link-${adv_title_index}"
                placeholder="Enter a link" value="https://google.com" />
            <br>
            <label for="dbs">Date:</label>
            <input type="text" id="proglanguage2" class="editor-field text-black" data-target="#${previewSection}-adv-date-${adv_title_index}"
                placeholder="Enter a date" value="Feb 2023" />
        </div>
        `

        $(`.right-lower.main-content .editable .${previewSection} .section-container`).append(adv_title_template);
        $(`#accordion-color-body-${accordionIndex} .accordion-inner`).append(adv_title_editor_template);
    }
    else if (action == "create-bullet") {
        let bullet_template = `
        <div class="bullet-points text-xs mt-1">
        <li>
            An online investor-focused crypto-currency price tracker
            and a platform that provides useful insights of the
            cryptocurrency market daily.
        </li>
        </div>
        `

        let bullet_editor_template = `
        <label for="dbs">Bullet 1:</label>
        <input type="text" id="bullet1" class="editor-field text-black" data-target="#preview-bullet1"
            placeholder="Enter a bullet" />
        `

        $(`.right-lower.main-content .editable .${previewSection} .section-container`).append(bullet_template);
        $(`#accordion-color-body-${accordionIndex} .accordion-inner`).append(bullet_editor_template);

    }
    else {
        toastr.error("Invalid action: " + action);
    }
}