function formatHTML(html) {
    const lines = html.split("\n");

    // Remove empty lines at the beginning and end
    while (lines.length && !lines[0].trim()) {
        lines.shift();
    }

    while (lines.length && !lines[lines.length - 1].trim()) {
        lines.pop();
    }

    // Find common indentation
    const indents = lines
        .filter(line => line.trim())
        .map(line => line.match(/^[ \t]*/)[0].length);

    const minIndent = Math.min(...indents);

    return lines
        .map(line => line.slice(minIndent).trimEnd())
        .join("\n");
}

document.querySelectorAll(".component-example").forEach(function (example) {

    // Get HTML from the component example
    const html = formatHTML(example.innerHTML);

    // Create code container
    const codeExample = document.createElement("div");
    codeExample.className = "code-example";

    codeExample.innerHTML = `
        <div class="code-header">
            <span>HTML</span>

            <button class="code-copy" type="button">
                <i class="bi bi-copy"></i>
                Kopier
            </button>
        </div>

        <div class="code-content">
            <pre class="line-numbers"><code class="language-markup"></code></pre>
        </div>

        <button class="code-expand" type="button">
            Vis all kode
        </button>
    `;

    // Insert code as text, not rendered HTML
    const code = codeExample.querySelector("code");
    code.textContent = html;

    // Add code box after component
    example.after(codeExample);

    // Apply Prism syntax highlighting
    Prism.highlightElement(code);

    // Copy functionality
    const copyButton = codeExample.querySelector(".code-copy");

    copyButton.addEventListener("click", async function () {
        try {
            await navigator.clipboard.writeText(html);

            copyButton.textContent = "Kopiert!";

            setTimeout(function () {
                copyButton.innerHTML =
                    '<i class="bi bi-copy"></i> Kopier';
            }, 2000);
        } catch (error) {
            copyButton.textContent = "Kunne ikke kopiere";
        }
    });

    // Expand functionality
    const expandButton = codeExample.querySelector(".code-expand");

    expandButton.addEventListener("click", function () {

        codeExample.classList.toggle("expanded");

        if (codeExample.classList.contains("expanded")) {
            expandButton.textContent = "Skjul kode";
        } else {
            expandButton.textContent = "Vis all kode";
        }

    });

});