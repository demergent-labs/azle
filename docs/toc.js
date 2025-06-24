// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML =
            '<ol class="chapter"><li class="chapter-item expanded "><a href="the_azle_book.html"><strong aria-hidden="true">1.</strong> The Azle Book (Release Candidate)</a></li><li class="chapter-item expanded "><a href="candid_rpc_or_http_server.html"><strong aria-hidden="true">2.</strong> Candid RPC or HTTP Server</a></li><li class="chapter-item expanded "><a href="candid_rpc.html"><strong aria-hidden="true">3.</strong> Candid RPC</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="candid_rpc/get_started.html"><strong aria-hidden="true">3.1.</strong> Get Started</a></li><li class="chapter-item expanded "><a href="candid_rpc/examples.html"><strong aria-hidden="true">3.2.</strong> Examples</a></li><li class="chapter-item expanded "><a href="candid_rpc/canister_class.html"><strong aria-hidden="true">3.3.</strong> Canister Class</a></li><li class="chapter-item expanded "><a href="candid_rpc/dfinity_candid_idl.html"><strong aria-hidden="true">3.4.</strong> @dfinity/candid IDL</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators.html"><strong aria-hidden="true">3.5.</strong> Decorators</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="candid_rpc/decorators/query.html"><strong aria-hidden="true">3.5.1.</strong> @query</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/update.html"><strong aria-hidden="true">3.5.2.</strong> @update</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/init.html"><strong aria-hidden="true">3.5.3.</strong> @init</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/post_upgrade.html"><strong aria-hidden="true">3.5.4.</strong> @postUpgrade</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/pre_upgrade.html"><strong aria-hidden="true">3.5.5.</strong> @preUpgrade</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/inspect_message.html"><strong aria-hidden="true">3.5.6.</strong> @inspectMessage</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/heartbeat.html"><strong aria-hidden="true">3.5.7.</strong> @heartbeat</a></li></ol></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api.html"><strong aria-hidden="true">3.6.</strong> IC API</a></li></ol></li><li class="chapter-item expanded "><a href="http_server.html"><strong aria-hidden="true">4.</strong> HTTP Server (Experimental)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="get_started.html"><strong aria-hidden="true">4.1.</strong> Get Started</a></li><li class="chapter-item expanded "><a href="rest_based_examples.html"><strong aria-hidden="true">4.2.</strong> Examples</a></li><li class="chapter-item expanded "><a href="deployment.html"><strong aria-hidden="true">4.3.</strong> Deployment</a></li><li class="chapter-item expanded "><a href="project_structure.html"><strong aria-hidden="true">4.4.</strong> Project Structure</a></li><li class="chapter-item expanded "><a href="servers.html"><strong aria-hidden="true">4.5.</strong> Servers</a></li><li class="chapter-item expanded "><a href="assets.html"><strong aria-hidden="true">4.6.</strong> Assets</a></li><li class="chapter-item expanded "><a href="authentication.html"><strong aria-hidden="true">4.7.</strong> Authentication</a></li><li class="chapter-item expanded "><a href="fetch.html"><strong aria-hidden="true">4.8.</strong> fetch</a></li><li class="chapter-item expanded "><a href="npm.html"><strong aria-hidden="true">4.9.</strong> npm</a></li><li class="chapter-item expanded "><a href="tokens.html"><strong aria-hidden="true">4.10.</strong> Tokens</a></li><li class="chapter-item expanded "><a href="bitcoin.html"><strong aria-hidden="true">4.11.</strong> Bitcoin</a></li><li class="chapter-item expanded "><a href="ethereum.html"><strong aria-hidden="true">4.12.</strong> Ethereum</a></li><li class="chapter-item expanded "><a href="databases.html"><strong aria-hidden="true">4.13.</strong> Databases</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.14.</strong> Cycles</div></li><li class="chapter-item expanded "><a href="debugging.html"><strong aria-hidden="true">4.15.</strong> Debugging</a></li><li class="chapter-item expanded "><a href="limitations.html"><strong aria-hidden="true">4.16.</strong> Limitations</a></li><li class="chapter-item expanded "><a href="reference_http/reference.html"><strong aria-hidden="true">4.17.</strong> Reference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="reference_http/autoreload.html"><strong aria-hidden="true">4.17.1.</strong> Autoreload</a></li><li class="chapter-item expanded "><a href="reference_http/environment_variables.html"><strong aria-hidden="true">4.17.2.</strong> Environment Variables</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        var links = Array.prototype.slice.call(this.querySelectorAll('a'));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute('href');
            if (
                href &&
                !href.startsWith('#') &&
                !/^(?:[a-z+]+:)?\/\//.test(href)
            ) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (
                link.href === current_page ||
                (i === 0 &&
                    path_to_root === '' &&
                    current_page.endsWith('/index.html'))
            ) {
                link.classList.add('active');
                var parent = link.parentElement;
                if (parent && parent.classList.contains('chapter-item')) {
                    parent.classList.add('expanded');
                }
                while (parent) {
                    if (
                        parent.tagName === 'LI' &&
                        parent.previousElementSibling
                    ) {
                        if (
                            parent.previousElementSibling.classList.contains(
                                'chapter-item'
                            )
                        ) {
                            parent.previousElementSibling.classList.add(
                                'expanded'
                            );
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener(
            'click',
            function (e) {
                if (e.target.tagName === 'A') {
                    sessionStorage.setItem('sidebar-scroll', this.scrollTop);
                }
            },
            { passive: true }
        );
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles =
            document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define(
    'mdbook-sidebar-scrollbox',
    MDBookSidebarScrollbox
);
