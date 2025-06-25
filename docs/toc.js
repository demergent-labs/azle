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
            '<ol class="chapter"><li class="chapter-item expanded "><a href="the_azle_book.html"><strong aria-hidden="true">1.</strong> The Azle Book (Release Candidate)</a></li><li class="chapter-item expanded "><a href="candid_rpc_or_http_server.html"><strong aria-hidden="true">2.</strong> Candid RPC or HTTP Server</a></li><li class="chapter-item expanded "><a href="candid_rpc.html"><strong aria-hidden="true">3.</strong> Candid RPC (AI-generated)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="candid_rpc/get_started.html"><strong aria-hidden="true">3.1.</strong> Get Started</a></li><li class="chapter-item expanded "><a href="candid_rpc/examples.html"><strong aria-hidden="true">3.2.</strong> Examples</a></li><li class="chapter-item expanded "><a href="candid_rpc/canister_class.html"><strong aria-hidden="true">3.3.</strong> Canister Class</a></li><li class="chapter-item expanded "><a href="candid_rpc/dfinity_candid_idl.html"><strong aria-hidden="true">3.4.</strong> @dfinity/candid IDL</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators.html"><strong aria-hidden="true">3.5.</strong> Decorators</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="candid_rpc/decorators/query.html"><strong aria-hidden="true">3.5.1.</strong> @query</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/update.html"><strong aria-hidden="true">3.5.2.</strong> @update</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/init.html"><strong aria-hidden="true">3.5.3.</strong> @init</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/post_upgrade.html"><strong aria-hidden="true">3.5.4.</strong> @postUpgrade</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/pre_upgrade.html"><strong aria-hidden="true">3.5.5.</strong> @preUpgrade</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/inspect_message.html"><strong aria-hidden="true">3.5.6.</strong> @inspectMessage</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/heartbeat.html"><strong aria-hidden="true">3.5.7.</strong> @heartbeat</a></li><li class="chapter-item expanded "><a href="candid_rpc/decorators/on_low_wasm_memory.html"><strong aria-hidden="true">3.5.8.</strong> @onLowWasmMemory</a></li></ol></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api.html"><strong aria-hidden="true">3.6.</strong> IC API</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="candid_rpc/ic_api/call.html"><strong aria-hidden="true">3.6.1.</strong> call</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/candid_decode.html"><strong aria-hidden="true">3.6.2.</strong> candidDecode</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/candid_encode.html"><strong aria-hidden="true">3.6.3.</strong> candidEncode</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/canister_cycle_balance.html"><strong aria-hidden="true">3.6.4.</strong> canisterCycleBalance</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/canister_self.html"><strong aria-hidden="true">3.6.5.</strong> canisterSelf</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/canister_version.html"><strong aria-hidden="true">3.6.6.</strong> canisterVersion</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/chunk.html"><strong aria-hidden="true">3.6.7.</strong> chunk</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/clear_timer.html"><strong aria-hidden="true">3.6.8.</strong> clearTimer</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/cycles_burn.html"><strong aria-hidden="true">3.6.9.</strong> cyclesBurn</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/data_certificate.html"><strong aria-hidden="true">3.6.10.</strong> dataCertificate</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/in_replicated_execution.html"><strong aria-hidden="true">3.6.11.</strong> inReplicatedExecution</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/is_controller.html"><strong aria-hidden="true">3.6.12.</strong> isController</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_arg_data.html"><strong aria-hidden="true">3.6.13.</strong> msgArgData</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_caller.html"><strong aria-hidden="true">3.6.14.</strong> msgCaller</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_cycles_accept.html"><strong aria-hidden="true">3.6.15.</strong> msgCyclesAccept</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_cycles_available.html"><strong aria-hidden="true">3.6.16.</strong> msgCyclesAvailable</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_cycles_refunded.html"><strong aria-hidden="true">3.6.17.</strong> msgCyclesRefunded</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_method_name.html"><strong aria-hidden="true">3.6.18.</strong> msgMethodName</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_reject.html"><strong aria-hidden="true">3.6.19.</strong> msgReject</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_reject_code.html"><strong aria-hidden="true">3.6.20.</strong> msgRejectCode</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_reject_msg.html"><strong aria-hidden="true">3.6.21.</strong> msgRejectMsg</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/msg_reply.html"><strong aria-hidden="true">3.6.22.</strong> msgReply</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/performance_counter.html"><strong aria-hidden="true">3.6.23.</strong> performanceCounter</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/rand_seed.html"><strong aria-hidden="true">3.6.24.</strong> randSeed</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/set_timer.html"><strong aria-hidden="true">3.6.25.</strong> setTimer</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/set_timer_interval.html"><strong aria-hidden="true">3.6.26.</strong> setTimerInterval</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/time.html"><strong aria-hidden="true">3.6.27.</strong> time</a></li><li class="chapter-item expanded "><a href="candid_rpc/ic_api/trap.html"><strong aria-hidden="true">3.6.28.</strong> trap</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="http_server.html"><strong aria-hidden="true">4.</strong> HTTP Server (Experimental)</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="get_started.html"><strong aria-hidden="true">4.1.</strong> Get Started</a></li><li class="chapter-item expanded "><a href="rest_based_examples.html"><strong aria-hidden="true">4.2.</strong> Examples</a></li><li class="chapter-item expanded "><a href="deployment.html"><strong aria-hidden="true">4.3.</strong> Deployment</a></li><li class="chapter-item expanded "><a href="project_structure.html"><strong aria-hidden="true">4.4.</strong> Project Structure</a></li><li class="chapter-item expanded "><a href="servers.html"><strong aria-hidden="true">4.5.</strong> Servers</a></li><li class="chapter-item expanded "><a href="assets.html"><strong aria-hidden="true">4.6.</strong> Assets</a></li><li class="chapter-item expanded "><a href="authentication.html"><strong aria-hidden="true">4.7.</strong> Authentication</a></li><li class="chapter-item expanded "><a href="fetch.html"><strong aria-hidden="true">4.8.</strong> fetch</a></li><li class="chapter-item expanded "><a href="npm.html"><strong aria-hidden="true">4.9.</strong> npm</a></li><li class="chapter-item expanded "><a href="tokens.html"><strong aria-hidden="true">4.10.</strong> Tokens</a></li><li class="chapter-item expanded "><a href="bitcoin.html"><strong aria-hidden="true">4.11.</strong> Bitcoin</a></li><li class="chapter-item expanded "><a href="ethereum.html"><strong aria-hidden="true">4.12.</strong> Ethereum</a></li><li class="chapter-item expanded "><a href="databases.html"><strong aria-hidden="true">4.13.</strong> Databases</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.14.</strong> Cycles</div></li><li class="chapter-item expanded "><a href="debugging.html"><strong aria-hidden="true">4.15.</strong> Debugging</a></li><li class="chapter-item expanded "><a href="limitations.html"><strong aria-hidden="true">4.16.</strong> Limitations</a></li><li class="chapter-item expanded "><a href="reference_http/reference.html"><strong aria-hidden="true">4.17.</strong> Reference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="reference_http/autoreload.html"><strong aria-hidden="true">4.17.1.</strong> Autoreload</a></li><li class="chapter-item expanded "><a href="reference_http/environment_variables.html"><strong aria-hidden="true">4.17.2.</strong> Environment Variables</a></li></ol></li></ol></li></ol>';
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
