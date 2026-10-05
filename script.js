// ==========================================
// MENOCARE - JAVASCRIPT
// ==========================================



// ==========================================
// SYMPTOM CHECKER
// ==========================================

let analyzeButton = document.querySelector(".analyze-btn");

if (analyzeButton != null) {

    analyzeButton.addEventListener(
        "click",
        analyzeSymptoms
    );

}


let checkboxes = document.querySelectorAll(
    '.symptom-list input[type="checkbox"]'
);


for (let i = 0; i < checkboxes.length; i++) {

    checkboxes[i].addEventListener(
        "change",
        updateSymptomDetails
    );

}



// ==========================================
// SHOW SYMPTOM SEVERITY & FREQUENCY
// ==========================================

function updateSymptomDetails() {

    let selectedCheckboxes =
        document.querySelectorAll(
            '.symptom-list input[type="checkbox"]:checked'
        );


    let oldDetails =
        document.querySelector(
            ".symptom-details-section"
        );


    if (oldDetails != null) {

        oldDetails.remove();

    }


    if (selectedCheckboxes.length == 0) {

        return;

    }


    let detailsSection =
        document.createElement("div");


    detailsSection.className =
        "symptom-details-section";


    let heading =
        document.createElement("h2");


    heading.innerText =
        "Tell us a little more";


    detailsSection.appendChild(
        heading
    );


    let description =
        document.createElement("p");


    description.innerText =
        "For each selected symptom, choose its severity and how often you experience it.";


    detailsSection.appendChild(
        description
    );


    for (let i = 0; i < selectedCheckboxes.length; i++) {

        let symptomName =
            selectedCheckboxes[i].value;


        let symptomRow =
            document.createElement("div");


        symptomRow.className =
            "symptom-detail-row";


        let name =
            document.createElement("strong");


        name.innerText =
            symptomName;


        symptomRow.appendChild(
            name
        );


        // Severity

        let severityLabel =
            document.createElement("label");


        severityLabel.innerText =
            "Severity";


        let severity =
            document.createElement("select");


        severity.className =
            "severity";


        severity.innerHTML = `
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
        `;


        severityLabel.appendChild(
            severity
        );


        symptomRow.appendChild(
            severityLabel
        );


        // Frequency

        let frequencyLabel =
            document.createElement("label");


        frequencyLabel.innerText =
            "Frequency";


        let frequency =
            document.createElement("select");


        frequency.className =
            "frequency";


        frequency.innerHTML = `
            <option value="Once">Once</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Several times a week">
                Several times a week
            </option>
            <option value="Daily">Daily</option>
            <option value="Multiple times a day">
                Multiple times a day
            </option>
        `;


        frequencyLabel.appendChild(
            frequency
        );


        symptomRow.appendChild(
            frequencyLabel
        );


        detailsSection.appendChild(
            symptomRow
        );

    }


    let otherSymptom =
        document.querySelector(
            ".other-symptom"
        );


    otherSymptom.parentNode.insertBefore(
        detailsSection,
        otherSymptom
    );

}



// ==========================================
// ANALYZE SYMPTOMS
// ==========================================

function analyzeSymptoms() {

    let symptoms = [];


    let detailRows =
        document.querySelectorAll(
            ".symptom-detail-row"
        );


    for (let i = 0; i < detailRows.length; i++) {

        let symptomName =
            detailRows[i]
            .querySelector("strong")
            .innerText;


        let severity =
            detailRows[i]
            .querySelector(".severity")
            .value;


        let frequency =
            detailRows[i]
            .querySelector(".frequency")
            .value;


        symptoms.push({

            name: symptomName,

            severity: severity,

            frequency: frequency

        });

    }


    // Custom symptom

    let customSymptom =
        document.querySelector(
            ".other-symptom textarea"
        ).value.trim();


    if (customSymptom != "") {

        symptoms.push({

            name: customSymptom,

            severity: "Not specified",

            frequency: "Not specified"

        });

    }


    if (symptoms.length == 0) {

        alert(
            "Please select at least one symptom."
        );

        return;

    }


    saveSymptoms(symptoms);

    showResult(symptoms);

}



// ==========================================
// SAVE SYMPTOMS
// ==========================================

function saveSymptoms(symptoms) {

    let today = new Date();


    let date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();


    let healthRecord = {

        date: date,

        symptoms: symptoms

    };


    let oldRecords =
        JSON.parse(
            localStorage.getItem(
                "menocareSymptoms"
            )
        );


    if (oldRecords == null) {

        oldRecords = [];

    }


    oldRecords.push(
        healthRecord
    );


    localStorage.setItem(
        "menocareSymptoms",
        JSON.stringify(oldRecords)
    );

}



// ==========================================
// SHOW SYMPTOM RESULT
// ==========================================

function showResult(symptoms) {

    let oldResult =
        document.querySelector(
            ".result-box"
        );


    if (oldResult != null) {

        oldResult.remove();

    }


    let commonlyAssociated = [

        "Hot flashes",
        "Night sweats",
        "Sudden feeling of warmth",
        "Excessive sweating",

        "Difficulty falling asleep",
        "Waking up frequently",
        "Poor sleep quality",
        "Insomnia",

        "Mood swings",
        "Irritability",
        "Anxiety",

        "Difficulty concentrating",
        "Brain fog",
        "Forgetfulness",

        "Irregular periods",
        "Missed periods",
        "Periods coming earlier",
        "Periods coming later",

        "Shorter menstrual cycles",
        "Longer menstrual cycles",

        "Heavier periods",
        "Lighter periods",

        "Vaginal dryness",
        "Vaginal discomfort",

        "Reduced sexual desire"

    ];


    let relatedCount = 0;


    for (let i = 0; i < symptoms.length; i++) {

        if (
            commonlyAssociated.includes(
                symptoms[i].name
            )
        ) {

            relatedCount++;

        }

    }


    let resultBox =
        document.createElement("div");


    resultBox.className =
        "result-box";


    let heading =
        document.createElement("h2");


    heading.innerText =
        "🌸 Your Symptom Overview";


    resultBox.appendChild(
        heading
    );


    let count =
        document.createElement("p");


    count.innerText =
        "You selected " +
        symptoms.length +
        " symptom(s).";


    resultBox.appendChild(
        count
    );


    let result =
        document.createElement("p");


    if (relatedCount >= 3) {

        result.innerHTML =
            "<strong>🟠 Possible connection with the " +
            "menopausal transition</strong><br><br>" +

            "Several of the symptoms you selected can occur " +
            "during perimenopause or menopause. However, " +
            "these symptoms can also have other causes. " +
            "This result is not a diagnosis.";

    }

    else if (relatedCount > 0) {

        result.innerHTML =
            "<strong>🟡 Some symptoms can occur during " +
            "the menopausal transition</strong><br><br>" +

            "Some of the symptoms you selected can occur " +
            "during perimenopause or menopause. However, " +
            "they are not specific to menopause and may " +
            "have other possible causes.";

    }

    else {

        result.innerHTML =
            "<strong>🔵 Your selected symptoms are " +
            "not specific to menopause</strong><br><br>" +

            "The symptoms you selected can have several " +
            "possible causes. Consider discussing persistent " +
            "or concerning symptoms with a healthcare professional.";

    }


    resultBox.appendChild(
        result
    );


    let selectedHeading =
        document.createElement("h3");


    selectedHeading.innerText =
        "Your Selected Symptoms";


    resultBox.appendChild(
        selectedHeading
    );


    let list =
        document.createElement("ul");


    for (let i = 0; i < symptoms.length; i++) {

        let item =
            document.createElement("li");


        item.innerText =
            symptoms[i].name +
            " — " +
            symptoms[i].severity +
            " — " +
            symptoms[i].frequency;


        list.appendChild(
            item
        );

    }


    resultBox.appendChild(
        list
    );


    let warning =
        document.createElement("p");


    warning.className =
        "medical-warning";


    warning.innerHTML =
        "⚠️ <strong>Important:</strong> " +

        "MenoCare is an educational and tracking tool " +
        "and cannot diagnose medical conditions. " +

        "If your symptoms are severe, persistent, " +
        "unusual for you, or causing concern, " +

        "please consider speaking with a qualified " +
        "healthcare professional.";


    resultBox.appendChild(
        warning
    );


    let container =
        document.querySelector(
            ".symptoms-container"
        );


    container.appendChild(
        resultBox
    );


    resultBox.scrollIntoView({

        behavior: "smooth"

    });

}



// ==========================================
// HEALTH TIMELINE
// ==========================================

let timelineRecords =
    document.querySelector(
        "#timelineRecords"
    );


if (timelineRecords != null) {

    loadTimeline();

}



function loadTimeline() {

    let records =
        JSON.parse(
            localStorage.getItem(
                "menocareSymptoms"
            )
        );


    let noData =
        document.querySelector(
            "#noTimelineData"
        );


    let totalRecords =
        document.querySelector(
            "#totalRecords"
        );


    let totalSymptoms =
        document.querySelector(
            "#totalSymptoms"
        );


    let lastCheckIn =
        document.querySelector(
            "#lastCheckIn"
        );


    if (
        records == null ||
        records.length == 0
    ) {

        noData.style.display = "block";

        return;

    }


    noData.style.display = "none";


    totalRecords.innerText =
        records.length;


    let symptomCount = 0;


    for (let i = 0; i < records.length; i++) {

        symptomCount +=
            records[i].symptoms.length;

    }


    totalSymptoms.innerText =
        symptomCount;


    lastCheckIn.innerText =
        records[records.length - 1].date;


    for (
        let i = records.length - 1;
        i >= 0;
        i--
    ) {

        createTimelineRecord(
            records[i]
        );

    }

}



function createTimelineRecord(record) {

    let timeline =
        document.querySelector(
            "#timelineRecords"
        );


    let recordBox =
        document.createElement("div");


    recordBox.className =
        "timeline-record";


    let date =
        document.createElement("div");


    date.className =
        "timeline-record-date";


    date.innerText =
        "📅 " + record.date;


    recordBox.appendChild(
        date
    );


    let heading =
        document.createElement("h3");


    heading.innerText =
        record.symptoms.length +
        " symptom(s) recorded";


    recordBox.appendChild(
        heading
    );


    for (
        let i = 0;
        i < record.symptoms.length;
        i++
    ) {

        let symptom =
            record.symptoms[i];


        let symptomBox =
            document.createElement("span");


        symptomBox.className =
            "timeline-symptom";


        symptomBox.innerText =
            symptom.name +
            " • " +
            symptom.severity +
            " • " +
            symptom.frequency;


        recordBox.appendChild(
            symptomBox
        );

    }


    timeline.appendChild(
        recordBox
    );

}



// ==========================================
// PERIOD TRACKER
// ==========================================

// Find Save Period button

let savePeriodButton =
    document.querySelector(
        "#savePeriod"
    );


if (savePeriodButton != null) {

    savePeriodButton.addEventListener(
        "click",
        savePeriod
    );

}


// Load periods when Period page opens

let periodRecords =
    document.querySelector(
        "#periodRecords"
    );


if (periodRecords != null) {

    loadPeriods();

}



// ==========================================
// SAVE PERIOD
// ==========================================

function savePeriod() {

    let startDate =
        document.querySelector(
            "#periodStart"
        ).value;


    let endDate =
        document.querySelector(
            "#periodEnd"
        ).value;


    let flow =
        document.querySelector(
            "#periodFlow"
        ).value;


    // Check dates

    if (
        startDate == "" ||
        endDate == ""
    ) {

        alert(
            "Please enter both the first and last day of your period."
        );

        return;

    }


    // Check if end date is before start date

    if (endDate < startDate) {

        alert(
            "The last day cannot be before the first day."
        );

        return;

    }


    // Get selected symptoms

    let symptomCheckboxes =
        document.querySelectorAll(
            ".period-symptom:checked"
        );


    let symptoms = [];


    for (
        let i = 0;
        i < symptomCheckboxes.length;
        i++
    ) {

        symptoms.push(
            symptomCheckboxes[i].value
        );

    }


    // Calculate duration

    let start =
        new Date(
            startDate
        );


    let end =
        new Date(
            endDate
        );


    let difference =
        end - start;


    let duration =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    // Create period record

    let period = {

        startDate: startDate,

        endDate: endDate,

        flow: flow,

        symptoms: symptoms,

        duration: duration

    };


    // Get old periods

    let oldPeriods =
        JSON.parse(
            localStorage.getItem(
                "menocarePeriods"
            )
        );


    if (oldPeriods == null) {

        oldPeriods = [];

    }


    // Add new period

    oldPeriods.push(
        period
    );


    // Save

    localStorage.setItem(
        "menocarePeriods",
        JSON.stringify(
            oldPeriods
        )
    );


    // Clear form

    document.querySelector(
        "#periodStart"
    ).value = "";


    document.querySelector(
        "#periodEnd"
    ).value = "";


    document.querySelector(
        "#periodFlow"
    ).value = "Light";


    for (
        let i = 0;
        i < symptomCheckboxes.length;
        i++
    ) {

        symptomCheckboxes[i].checked =
            false;

    }


    // Reload history

    loadPeriods();


    alert(
        "Period entry saved successfully!"
    );

}



// ==========================================
// LOAD PERIODS
// ==========================================

function loadPeriods() {

    let records =
        JSON.parse(
            localStorage.getItem(
                "menocarePeriods"
            )
        );


    let container =
        document.querySelector(
            "#periodRecords"
        );


    let noData =
        document.querySelector(
            "#noPeriodData"
        );


    let lastPeriod =
        document.querySelector(
            "#lastPeriod"
        );


    let cycleLength =
        document.querySelector(
            "#cycleLength"
        );


    let periodCount =
        document.querySelector(
            "#periodCount"
        );


    // Clear old displayed records

    container.innerHTML = "";


    // No data

    if (
        records == null ||
        records.length == 0
    ) {

        noData.style.display =
            "block";


        periodCount.innerText =
            "0";


        lastPeriod.innerText =
            "-";


        cycleLength.innerText =
            "-";


        return;

    }


    // Hide no-data message

    noData.style.display =
        "none";


    // Period count

    periodCount.innerText =
        records.length;


    // Sort by date

    records.sort(
        function(a, b) {

            return new Date(
                b.startDate
            ) - new Date(
                a.startDate
            );

        }
    );


    // Last period

    lastPeriod.innerText =
        formatDate(
            records[0].startDate
        );


    // Calculate cycle length

    if (records.length >= 2) {

        let latest =
            new Date(
                records[0].startDate
            );


        let previous =
            new Date(
                records[1].startDate
            );


        let difference =
            latest - previous;


        let days =
            Math.round(
                difference /
                (1000 * 60 * 60 * 24)
            );


        cycleLength.innerText =
            days + " days";

    }

    else {

        cycleLength.innerText =
            "1st entry";

    }


    // Display periods

    for (
        let i = 0;
        i < records.length;
        i++
    ) {

        createPeriodRecord(
            records[i]
        );

    }

}



// ==========================================
// CREATE PERIOD RECORD
// ==========================================

function createPeriodRecord(record) {

    let container =
        document.querySelector(
            "#periodRecords"
        );


    let box =
        document.createElement("div");


    box.className =
        "period-record";


    // Date

    let date =
        document.createElement("div");


    date.className =
        "period-record-date";


    date.innerText =
        "🩸 " +
        formatDate(
            record.startDate
        ) +
        " – " +
        formatDate(
            record.endDate
        );


    box.appendChild(
        date
    );


    // Details

    let details =
        document.createElement("div");


    details.className =
        "period-record-details";


    // Duration

    let duration =
        document.createElement("span");


    duration.className =
        "period-detail";


    duration.innerText =
        "Duration: " +
        record.duration +
        " days";


    details.appendChild(
        duration
    );


    // Flow

    let flow =
        document.createElement("span");


    flow.className =
        "period-detail";


    flow.innerText =
        "Flow: " +
        record.flow;


    details.appendChild(
        flow
    );


    // Symptoms

    if (
        record.symptoms.length > 0
    ) {

        for (
            let i = 0;
            i < record.symptoms.length;
            i++
        ) {

            let symptom =
                document.createElement(
                    "span"
                );


            symptom.className =
                "period-detail";


            symptom.innerText =
                record.symptoms[i];


            details.appendChild(
                symptom
            );

        }

    }


    box.appendChild(
        details
    );


    container.appendChild(
        box
    );

}



// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {

    let date =
        new Date(
            dateString +
            "T00:00:00"
        );


    let day =
        date.getDate();


    let month =
        date.toLocaleString(
            "default",
            {
                month: "short"
            }
        );


    let year =
        date.getFullYear();


    return (
        day +
        " " +
        month +
        " " +
        year
    );

}
// ==========================================
// MEDICAL REPORT UPLOAD
// ==========================================


// Find report elements

let reportFile =
    document.querySelector("#reportFile");


let selectedFileName =
    document.querySelector("#selectedFileName");


let analyzeReportButton =
    document.querySelector("#analyzeReport");


let reportSummaryContent =
    document.querySelector("#reportSummaryContent");


let reportWarning =
    document.querySelector("#reportWarning");


let savedReportsList =
    document.querySelector("#savedReportsList");


let noReports =
    document.querySelector("#noReports");



// ==========================================
// SHOW SELECTED FILE NAME
// ==========================================

if (reportFile != null) {

    reportFile.addEventListener(
        "change",
        showSelectedFile
    );

}



// ==========================================
// ANALYZE REPORT BUTTON
// ==========================================

if (analyzeReportButton != null) {

    analyzeReportButton.addEventListener(
        "click",
        analyzeReport
    );

}



// ==========================================
// SHOW FILE NAME
// ==========================================

function showSelectedFile() {

    if (reportFile.files.length == 0) {

        selectedFileName.innerText =
            "No file selected";

        return;

    }


    let file =
        reportFile.files[0];


    selectedFileName.innerText =
        "Selected: " + file.name;

}



// ==========================================
// ANALYZE REPORT
// ==========================================

function analyzeReport() {


    // Check if a file is selected

    if (reportFile.files.length == 0) {

        alert(
            "Please choose a report first."
        );

        return;

    }


    let file =
        reportFile.files[0];


    // Check file type

    if (
        file.type != "text/plain" &&
        !file.name.toLowerCase().endsWith(".txt")
    ) {

        alert(
            "For this prototype, please upload a TXT report."
        );

        return;

    }


    // Read the file

    let reader =
        new FileReader();


    reader.onload =
        function(event) {


            let text =
                event.target.result;


            createReportSummary(
                text,
                file.name
            );


        };


    reader.readAsText(file);

}



// ==========================================
// CREATE REPORT SUMMARY
// ==========================================

function createReportSummary(
    text,
    fileName
) {


    // Clean text

    let cleanText =
        text.trim();


    // Check empty report

    if (cleanText == "") {

        alert(
            "The uploaded report appears to be empty."
        );

        return;

    }


    // --------------------------------------
    // Create simple summary
    // --------------------------------------

    let words =
        cleanText.split(/\s+/);


    let wordCount =
        words.length;


    let sentences =
        cleanText.split(/[.!?]+/);


    let sentenceCount =
        0;


    for (
        let i = 0;
        i < sentences.length;
        i++
    ) {

        if (
            sentences[i].trim() != ""
        ) {

            sentenceCount++;

        }

    }


    // Take first few sentences

    let summaryText = "";


    let usefulSentences = 0;


    for (
        let i = 0;
        i < sentences.length;
        i++
    ) {


        let sentence =
            sentences[i].trim();


        if (
            sentence != "" &&
            usefulSentences < 3
        ) {

            summaryText +=
                sentence + ". ";

            usefulSentences++;

        }

    }



    // --------------------------------------
    // Look for warning words
    // --------------------------------------

    let warningWords = [

        "abnormal",
        "high",
        "low",
        "elevated",
        "reduced",
        "critical",
        "positive",
        "negative",
        "irregular",
        "deficient",
        "severe"

    ];


    let foundWarnings = [];


    let lowerText =
        cleanText.toLowerCase();


    for (
        let i = 0;
        i < warningWords.length;
        i++
    ) {


        if (
            lowerText.includes(
                warningWords[i]
            )
        ) {

            foundWarnings.push(
                warningWords[i]
            );

        }

    }



    // --------------------------------------
    // Display summary
    // --------------------------------------

    reportSummaryContent.innerHTML = `

        <p>
            <strong>File:</strong>
            ${fileName}
        </p>

        <p>
            <strong>Basic overview:</strong>
            ${summaryText}
        </p>

        <p>
            <strong>Approximate word count:</strong>
            ${wordCount}
        </p>

        <p>
            <strong>Approximate sentence count:</strong>
            ${sentenceCount}
        </p>

    `;



    // --------------------------------------
    // Warning section
    // --------------------------------------

    if (
        foundWarnings.length > 0
    ) {


        reportWarning.innerHTML = `

            <h3>
                ⚠️ Words that may need attention
            </h3>

            <p>
                The uploaded text contains terms such as:
            </p>

            <p>
                <strong>
                    ${foundWarnings.join(", ")}
                </strong>
            </p>

            <p>
                These words alone do not mean that
                something is medically wrong. Please
                review the original report and discuss
                any concerning results with a qualified
                healthcare professional.
            </p>

        `;

    }


    else {


        reportWarning.innerHTML = `

            <h3>
                ✅ No obvious warning terms detected
            </h3>

            <p>
                The basic text scan did not find common
                warning terms in this prototype.
                This does not mean that the report is
                medically normal.
            </p>

        `;

    }



    // --------------------------------------
    // Save report
    // --------------------------------------

    saveReport(
        fileName,
        foundWarnings
    );

}



// ==========================================
// SAVE REPORT
// ==========================================

function saveReport(
    fileName,
    warnings
) {


    let today =
        new Date();


    let date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();


    let report = {

        fileName: fileName,

        date: date,

        warnings: warnings

    };


    // Get previous reports

    let oldReports =
        JSON.parse(
            localStorage.getItem(
                "menocareReports"
            )
        );


    if (
        oldReports == null
    ) {

        oldReports = [];

    }


    // Add report

    oldReports.push(
        report
    );


    // Save

    localStorage.setItem(
        "menocareReports",
        JSON.stringify(
            oldReports
        )
    );


    // Update display

    loadSavedReports();

}



// ==========================================
// LOAD SAVED REPORTS
// ==========================================

function loadSavedReports() {


    if (
        savedReportsList == null
    ) {

        return;

    }


    let reports =
        JSON.parse(
            localStorage.getItem(
                "menocareReports"
            )
        );


    savedReportsList.innerHTML =
        "";


    // No reports

    if (
        reports == null ||
        reports.length == 0
    ) {

        noReports.style.display =
            "block";

        return;

    }


    noReports.style.display =
        "none";


    // Show newest first

    for (
        let i = reports.length - 1;
        i >= 0;
        i--
    ) {


        let report =
            reports[i];


        let box =
            document.createElement(
                "div"
            );


        box.className =
            "saved-report";


        let name =
            document.createElement(
                "div"
            );


        name.className =
            "saved-report-name";


        name.innerText =
            "📄 " +
            report.fileName;


        box.appendChild(
            name
        );


        let date =
            document.createElement(
                "div"
            );


        date.className =
            "saved-report-date";


        date.innerText =
            "Uploaded: " +
            report.date;


        box.appendChild(
            date
        );


        if (
            report.warnings.length > 0
        ) {


            let warning =
                document.createElement(
                    "div"
                );


            warning.className =
                "saved-report-date";


            warning.innerText =
                "Terms detected: " +
                report.warnings.join(
                    ", "
                );


            box.appendChild(
                warning
            );

        }


        savedReportsList.appendChild(
            box
        );

    }

}



// ==========================================
// LOAD REPORTS WHEN PAGE OPENS
// ==========================================

if (
    savedReportsList != null
) {

    loadSavedReports();

}
// ==========================================
// ASK MENO AI CHATBOT
// ==========================================


// Find chatbot elements

let chatInput =
    document.querySelector("#chatInput");


let sendMessage =
    document.querySelector("#sendMessage");


let chatMessages =
    document.querySelector("#chatMessages");

   function addBotMessage(message) {

    let messageDiv =
        document.createElement("div");

    messageDiv.className =
        "bot-message";

    messageDiv.innerText =
        message;

    chatMessages.appendChild(
        messageDiv
    );

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ==========================================
// SUGGESTED QUESTIONS
// ==========================================

function askSuggestedQuestion(question) {

    if (chatInput == null) {
        return;
    }

    chatInput.value = question;

    sendChatMessage();

}

// ==========================================
// SEND MESSAGE
// ==========================================

if (sendMessage != null) {

    sendMessage.addEventListener(
        "click",
        sendChatMessage
    );

}



// Allow Enter key to send message

if (chatInput != null) {

    chatInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                sendChatMessage();

            }

        }
    );

}



// ==========================================
// SEND CHAT MESSAGE TO FLASK
// ==========================================

function sendChatMessage() {


    let question =
        chatInput.value.trim();


    // Don't send empty messages

    if (question == "") {

        return;

    }



    // Show user's message

    addUserMessage(question);


    // Clear input

    chatInput.value = "";


    // Show temporary message

    addBotMessage(
        "Ask Meno is thinking..."
    );



    // Send question to Flask

  fetch(
    "http://127.0.0.1:5000/chat",
    
        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                question: question

            })

        }
    )


    .then(function(response) {

        return response.json();

    })


    .then(function(data) {


        // Remove "thinking" message

        let messages =
            chatMessages.querySelectorAll(
                ".bot-message"
            );


        if (messages.length > 0) {

            messages[
                messages.length - 1
            ].remove();

        }



        // Show AI response

        if (data.success == true) {

            addBotMessage(
                data.answer
            );

        }

        else {

            addBotMessage(
                "Sorry, I could not generate a response right now."
            );

        }

    })


    .catch(function(error) {


        console.log(error);


        // Remove "thinking" message

        let messages =
            chatMessages.querySelectorAll(
                ".bot-message"
            );


        if (messages.length > 0) {

            messages[
                messages.length - 1
            ].remove();

        }


        addBotMessage(
            "Sorry, I could not connect to Ask Meno right now."
        );

    });

}



// ==========================================
// ADD USER MESSAGE
// ==========================================

function addUserMessage(message) {


    let messageDiv =
        document.createElement("div");


    messageDiv.className =
        "user-message";


    messageDiv.innerText =
        message;


    chatMessages.appendChild(
        messageDiv
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



// ==========================================
// ADD BOT MESSAGE
// ==========================================

function addBotMessage(message) {


    let messageDiv =
        document.createElement("div");


    messageDiv.className =
        "bot-message";


    messageDiv.innerText =
        message;


    chatMessages.appendChild(
        messageDiv
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}
