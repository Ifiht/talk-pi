 4: 00007FF7045941E4 v8::base::AddressSpaceReservation::AddressSpaceReservation+337700
 5: 00007FF7045A313C v8::internal::StrongRootAllocatorBase::deallocate_impl+16604
 6: 00007FF7045A297B v8::internal::StrongRootAllocatorBase::deallocate_impl+14619
 7: 00007FF705A2A2AD v8::base::UnsignedDivisionByConstant<unsigned __int64>+2794653
 8: 00007FF70458DFA0 v8::base::AddressSpaceReservation::AddressSpaceReservation+312544
 9: 00007FF7045A87EA X509_STORE_set_cleanup+5098
10: 00007FF7045B4C86 uv_timer_set_repeat+20694
11: 00007FF7041869C7 v8::String::Utf8Value::~Utf8Value+144199
12: 000001B31FE775FA
✖ tests\integration\mute-status-visibility.test.ts (120798.5436ms)
✔ tests\integration\piper-english-output.test.ts (753.9376ms)
✔ tests\integration\piper-model-menu.test.ts (430.6815ms)
✔ tests\integration\piper-preference-persistence.test.ts (455.5267ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\integration\push_to_talk_flow.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\integration\push_to_talk_flow.test.ts (350.1481ms)
✔ tests\integration\spoken-reply-error-handling.test.ts (434.9325ms)
✔ tests\integration\spoken-reply-flow.test.ts (436.395ms)
✔ tests\integration\spoken-reply-recording-mute.test.ts (470.8473ms)
✔ tests\integration\temp-wav-cleanup.test.ts (827.6ms)
✔ tests\integration\temp-wav-failure-cleanup.test.ts (486.0319ms)
✔ tests\integration\temp-wav-reuse.test.ts (1322.1953ms)
✔ tests\integration\unified-talk-menu-open.test.ts (1269.283ms)
✔ tests\unit\editor-insert.test.ts (368.5973ms)
✔ tests\unit\f5-shortcut.test.ts (449.2947ms)
✔ tests\unit\footer-status.test.ts (623.7685ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\input\keyboard_listener' imported from C:\Users\caste\repos\talk-pi\tests\unit\keyboard_listener.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/input/keyboard_listener'
}

Node.js v24.15.0
✖ tests\unit\keyboard_listener.test.ts (652.4386ms)
✔ tests\unit\mute-state.test.ts (507.6153ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder-cleanup.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder-cleanup.test.ts (1971.9307ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder.test.ts (1035.8684ms)
✔ tests\unit\offline-whisper-safe.test.ts (1468.2308ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-whisper' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-whisper.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-whisper'
}

Node.js v24.15.0
✖ tests\unit\offline-whisper.test.ts (530.8181ms)
✔ tests\unit\piper-client-path.test.ts (608.0221ms)
✔ tests\unit\piper-client.test.ts (701.7921ms)
✔ tests\unit\piper-config.test.ts (447.2248ms)
✔ tests\unit\piper-preferences.test.ts (556.5427ms)
✔ tests\unit\playback-queue-mute.test.ts (1007.5752ms)
✔ tests\unit\playback-queue-stop-idle.test.ts (8550.3405ms)
✔ tests\unit\playback-queue-stop.test.ts (753.3124ms)
✔ tests\unit\playback-queue.test.ts (1025.1589ms)
✔ tests\unit\recording-gate.test.ts (1453.701ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_controller.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\unit\recording_controller.test.ts (1118.8421ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\state\recording_state' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_state.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/state/recording_state'
}

Node.js v24.15.0
✖ tests\unit\recording_state.test.ts (2980.3307ms)
[talk-pi] Shortcut conflict: TALK_PI_SEND_TRANSCRIPT_KEY and TALK_PI_INSERT_TRANSCRIPT_KEY are both "f9". Using defaults.
✔ tests\unit\shortcut-config.test.ts (1021.0573ms)
AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert.ok(statuses.some((value) => value.includes("failed")))

    at run (file:///C:/Users/caste/repos/talk-pi/tests/unit/spoken-reply-failure.test.ts:33:10) {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: false,
  expected: true,
  operator: '==',
  diff: 'simple'
}
✖ tests\unit\spoken-reply-failure.test.ts (1867.9029ms)
✔ tests\unit\spoken-reply-status-muted.test.ts (1541.6928ms)
✔ tests\unit\spoken-text.test.ts (2107.1224ms)
✔ tests\unit\talk-pi-config.test.ts (1963.3109ms)
✔ tests\unit\temp-wav-buildup.test.ts (1977.2924ms)
✔ tests\unit\temp-wav-cleanup-outcomes.test.ts (1755.6866ms)
✔ tests\unit\temp-wav.test.ts (904.1525ms)
✔ tests\unit\unified-talk-menu.test.ts (1953.4864ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-cleanup.test.ts (1805.3227ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-language.test.ts (1621.0879ms)
✔ tests\unit\voice-shortcut-interrupt.test.ts (797.7328ms)
ℹ tests 50
ℹ suites 0
ℹ pass 37
ℹ fail 13
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 122035.0543

✖ failing tests:

test at tests\integration\esc-stop-playback.test.ts:1:1
✖ tests\integration\esc-stop-playback.test.ts (481.4074ms)
  'test failed'

test at tests\integration\mute-menu-toggle.test.ts:1:1
✖ tests\integration\mute-menu-toggle.test.ts (72000.193ms)
  'test failed'

test at tests\integration\mute-status-visibility.test.ts:1:1
✖ tests\integration\mute-status-visibility.test.ts (120798.5436ms)
  'test failed'

test at tests\integration\push_to_talk_flow.test.ts:1:1
✖ tests\integration\push_to_talk_flow.test.ts (350.1481ms)
  'test failed'

test at tests\unit\keyboard_listener.test.ts:1:1
✖ tests\unit\keyboard_listener.test.ts (652.4386ms)
  'test failed'

test at tests\unit\offline-recorder-cleanup.test.ts:1:1
✖ tests\unit\offline-recorder-cleanup.test.ts (1971.9307ms)
  'test failed'

test at tests\unit\offline-recorder.test.ts:1:1
✖ tests\unit\offline-recorder.test.ts (1035.8684ms)
  'test failed'

test at tests\unit\offline-whisper.test.ts:1:1
✖ tests\unit\offline-whisper.test.ts (530.8181ms)
  'test failed'

test at tests\unit\recording_controller.test.ts:1:1
✖ tests\unit\recording_controller.test.ts (1118.8421ms)
  'test failed'

test at tests\unit\recording_state.test.ts:1:1
✖ tests\unit\recording_state.test.ts (2980.3307ms)
  'test failed'

test at tests\unit\spoken-reply-failure.test.ts:1:1
✖ tests\unit\spoken-reply-failure.test.ts (1867.9029ms)
  'test failed'

test at tests\unit\voice-capture-cleanup.test.ts:1:1
✖ tests\unit\voice-capture-cleanup.test.ts (1805.3227ms)
  'test failed'

test at tests\unit\voice-capture-language.test.ts:1:1
✖ tests\unit\voice-capture-language.test.ts (1621.0879ms)
  'test failed'

C:\Users\caste\repos\talk-pi>node --test --experimental-strip-types tests/unit/*.test.ts tests/integration/*.test.ts
✔ tests\integration\esc-idle-noop.test.ts (7454.1538ms)
✔ tests\integration\esc-stop-playback.test.ts (713.0939ms)
✔ tests\integration\f5-auto-insert-flow.test.ts (402.1209ms)
✔ tests\integration\footer-status.test.ts (649.8901ms)

<--- Last few GCs --->

[19000:0000025E87AE8000]   151720 ms: Scavenge (interleaved) 2043.1 (2046.5) -> 2041.9 (2050.7) MB, pooled: 0 MB, 7.41 / 0.00 ms  (average mu = 0.334, current mu = 0.379) allocation failure;
[19000:0000025E87AE8000]   158397 ms: Mark-Compact (reduce) 2046.3 (2051.7) -> 2043.7 (2046.0) MB, pooled: 0 MB, 5429.75 / 0.00 ms  (+ 175.5 ms in 60 steps since start of marking, biggest step 37.6 ms, walltime since start of marking 5696 ms) (average mu
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 00007FF703B4403F node::OnFatalError+1343
 2: 00007FF70478FAA7 v8::Function::NewInstance+423
 3: 00007FF7045904D7 v8::base::AddressSpaceReservation::AddressSpaceReservation+322071
 4: 00007FF7045941E4 v8::base::AddressSpaceReservation::AddressSpaceReservation+337700
 5: 00007FF7045A313C v8::internal::StrongRootAllocatorBase::deallocate_impl+16604
 6: 00007FF7045A297B v8::internal::StrongRootAllocatorBase::deallocate_impl+14619
 7: 00007FF705A2A2AD v8::base::UnsignedDivisionByConstant<unsigned __int64>+2794653
 8: 00007FF70458DFA0 v8::base::AddressSpaceReservation::AddressSpaceReservation+312544
 9: 00007FF7045A87EA X509_STORE_set_cleanup+5098
10: 00007FF7045B4C86 uv_timer_set_repeat+20694
11: 00007FF7041869C7 v8::String::Utf8Value::~Utf8Value+144199
12: 0000025EBFA375FA
✖ tests\integration\mute-menu-toggle.test.ts (162212.0057ms)
✔ tests\integration\mute-playback-blocking.test.ts (1229.9149ms)

<--- Last few GCs --->

[12720:000001663200A000]   207739 ms: Scavenge (interleaved) 2024.6 (2034.0) -> 2017.9 (2050.5) MB, pooled: 0 MB, 9.06 / 0.00 ms  (average mu = 0.345, current mu = 0.336) allocation failure;
[12720:000001663200A000]   213047 ms: Mark-Compact (reduce) 2038.5 (2055.7) -> 2019.7 (2022.5) MB, pooled: 0 MB, 3790.04 / 0.00 ms  (+ 894.5 ms in 329 steps since start of marking, biggest step 59.6 ms, walltime since start of marking 4954 ms) (average mu
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 00007FF703B4403F node::OnFatalError+1343
 2: 00007FF70478FAA7 v8::Function::NewInstance+423
 3: 00007FF7045904D7 v8::base::AddressSpaceReservation::AddressSpaceReservation+322071
 4: 00007FF7045941E4 v8::base::AddressSpaceReservation::AddressSpaceReservation+337700
 5: 00007FF7045A313C v8::internal::StrongRootAllocatorBase::deallocate_impl+16604
 6: 00007FF7045A297B v8::internal::StrongRootAllocatorBase::deallocate_impl+14619
 7: 00007FF705A2A2AD v8::base::UnsignedDivisionByConstant<unsigned __int64>+2794653
 8: 00007FF70458DFA0 v8::base::AddressSpaceReservation::AddressSpaceReservation+312544
 9: 00007FF7045A87EA X509_STORE_set_cleanup+5098
10: 00007FF7045B4C86 uv_timer_set_repeat+20694
11: 00007FF7041869C7 v8::String::Utf8Value::~Utf8Value+144199
12: 0000016669FB75FA
✖ tests\integration\mute-status-visibility.test.ts (214556.8554ms)
✔ tests\integration\piper-english-output.test.ts (3464.7535ms)
✔ tests\integration\piper-model-menu.test.ts (4988.3407ms)
✔ tests\integration\piper-preference-persistence.test.ts (5459.7875ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\integration\push_to_talk_flow.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\integration\push_to_talk_flow.test.ts (1901.652ms)
✔ tests\integration\spoken-reply-error-handling.test.ts (2201.8767ms)
✔ tests\integration\spoken-reply-flow.test.ts (962.5619ms)
✔ tests\integration\spoken-reply-recording-mute.test.ts (968.2409ms)
✔ tests\integration\temp-wav-cleanup.test.ts (953.4086ms)
✔ tests\integration\temp-wav-failure-cleanup.test.ts (3024.6758ms)
✔ tests\integration\temp-wav-reuse.test.ts (3736.9094ms)
✔ tests\integration\unified-talk-menu-open.test.ts (4162.0447ms)
✔ tests\unit\editor-insert.test.ts (922.194ms)
✔ tests\unit\f5-shortcut.test.ts (1169.2242ms)
✔ tests\unit\footer-status.test.ts (1239.2782ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\input\keyboard_listener' imported from C:\Users\caste\repos\talk-pi\tests\unit\keyboard_listener.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/input/keyboard_listener'
}

Node.js v24.15.0
✖ tests\unit\keyboard_listener.test.ts (3582.6777ms)
✔ tests\unit\mute-state.test.ts (1236.2564ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder-cleanup.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder-cleanup.test.ts (948.9103ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder.test.ts (1449.6925ms)
✔ tests\unit\offline-whisper-safe.test.ts (2501.3508ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-whisper' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-whisper.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-whisper'
}

Node.js v24.15.0
✖ tests\unit\offline-whisper.test.ts (3560.0092ms)
✔ tests\unit\piper-client-path.test.ts (4179.7598ms)
✔ tests\unit\piper-client.test.ts (6323.9038ms)
✔ tests\unit\piper-config.test.ts (3589.7921ms)
✔ tests\unit\piper-preferences.test.ts (7087.8205ms)
✔ tests\unit\playback-queue-mute.test.ts (4113.557ms)
✔ tests\unit\playback-queue-stop-idle.test.ts (28748.3031ms)
✔ tests\unit\playback-queue-stop.test.ts (4878.3778ms)
✔ tests\unit\playback-queue.test.ts (3940.0897ms)
✔ tests\unit\recording-gate.test.ts (2592.817ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_controller.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\unit\recording_controller.test.ts (2026.3834ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\state\recording_state' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_state.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/state/recording_state'
}

Node.js v24.15.0
✖ tests\unit\recording_state.test.ts (2020.9342ms)
[talk-pi] Shortcut conflict: TALK_PI_SEND_TRANSCRIPT_KEY and TALK_PI_INSERT_TRANSCRIPT_KEY are both "f9". Using defaults.
✔ tests\unit\shortcut-config.test.ts (851.5565ms)
AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert.ok(statuses.some((value) => value.includes("failed")))

    at run (file:///C:/Users/caste/repos/talk-pi/tests/unit/spoken-reply-failure.test.ts:33:10) {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: false,
  expected: true,
  operator: '==',
  diff: 'simple'
}
✖ tests\unit\spoken-reply-failure.test.ts (3000.8743ms)
✔ tests\unit\spoken-reply-status-muted.test.ts (1308.3594ms)
✔ tests\unit\spoken-text.test.ts (646.7218ms)
✔ tests\unit\talk-pi-config.test.ts (578.8768ms)
✔ tests\unit\temp-wav-buildup.test.ts (1237.5803ms)
✔ tests\unit\temp-wav-cleanup-outcomes.test.ts (1840.9146ms)
✔ tests\unit\temp-wav.test.ts (3228.2595ms)
✔ tests\unit\unified-talk-menu.test.ts (910.9495ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-cleanup.test.ts (960.6011ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-language.test.ts (3903.4309ms)
✔ tests\unit\voice-shortcut-interrupt.test.ts (2401.3245ms)
ℹ tests 50
ℹ suites 0
ℹ pass 38
ℹ fail 12
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 217005.648

✖ failing tests:

test at tests\integration\mute-menu-toggle.test.ts:1:1
✖ tests\integration\mute-menu-toggle.test.ts (162212.0057ms)
  'test failed'

test at tests\integration\mute-status-visibility.test.ts:1:1
✖ tests\integration\mute-status-visibility.test.ts (214556.8554ms)
  'test failed'

test at tests\integration\push_to_talk_flow.test.ts:1:1
✖ tests\integration\push_to_talk_flow.test.ts (1901.652ms)
  'test failed'

test at tests\unit\keyboard_listener.test.ts:1:1
✖ tests\unit\keyboard_listener.test.ts (3582.6777ms)
  'test failed'

test at tests\unit\offline-recorder-cleanup.test.ts:1:1
✖ tests\unit\offline-recorder-cleanup.test.ts (948.9103ms)
  'test failed'

test at tests\unit\offline-recorder.test.ts:1:1
✖ tests\unit\offline-recorder.test.ts (1449.6925ms)
  'test failed'

test at tests\unit\offline-whisper.test.ts:1:1
✖ tests\unit\offline-whisper.test.ts (3560.0092ms)
  'test failed'

test at tests\unit\recording_controller.test.ts:1:1
✖ tests\unit\recording_controller.test.ts (2026.3834ms)
  'test failed'

test at tests\unit\recording_state.test.ts:1:1
✖ tests\unit\recording_state.test.ts (2020.9342ms)
  'test failed'

test at tests\unit\spoken-reply-failure.test.ts:1:1
✖ tests\unit\spoken-reply-failure.test.ts (3000.8743ms)
  'test failed'

test at tests\unit\voice-capture-cleanup.test.ts:1:1
✖ tests\unit\voice-capture-cleanup.test.ts (960.6011ms)
  'test failed'

C:\Users\caste\repos\talk-pi>node --test --experimental-strip-types tests/unit/*.test.ts tests/integration/*.test.ts
✔ tests\integration\esc-idle-noop.test.ts (3760.9525ms)     
✔ tests\integration\esc-stop-playback.test.ts (466.6881ms)  
✔ tests\integration\f5-auto-insert-flow.test.ts (402.4687ms)
✔ tests\integration\footer-status.test.ts (345.2133ms)      

<--- Last few GCs --->

[10532:000002B43FC89000]    50378 ms: Scavenge (interleaved) 2041.9 (2045.2) -> 2040.7 (2049.7) MB, pooled: 0 MB, 6.17 / 0.00 ms  (average mu = 0.222, current mu = 0.237) allocation failure;
[10532:000002B43FC89000]    54986 ms: Mark-Compact (reduce) 2045.4 (2050.7) -> 2042.5 (2045.0) MB, pooled: 0 MB, 3329.49 / 0.00 ms  (+ 261.5 ms in 64 steps since start of marking, biggest step 34.6 ms, walltime since start of marking 3741 ms) (average mu
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 00007FF703B4403F node::OnFatalError+1343
 2: 00007FF70478FAA7 v8::Function::NewInstance+423
 3: 00007FF7045904D7 v8::base::AddressSpaceReservation::AddressSpaceReservation+322071
 4: 00007FF7045941E4 v8::base::AddressSpaceReservation::AddressSpaceReservation+337700
 5: 00007FF7045A313C v8::internal::StrongRootAllocatorBase::deallocate_impl+16604
 6: 00007FF7045A297B v8::internal::StrongRootAllocatorBase::deallocate_impl+14619
 7: 00007FF705A2A2AD v8::base::UnsignedDivisionByConstant<unsigned __int64>+2794653
 8: 00007FF70458DFA0 v8::base::AddressSpaceReservation::AddressSpaceReservation+312544
 9: 00007FF7045A87EA X509_STORE_set_cleanup+5098
10: 00007FF7045B4C86 uv_timer_set_repeat+20694
11: 00007FF7041869C7 v8::String::Utf8Value::~Utf8Value+144199
12: 000002B477C375FA
✖ tests\integration\mute-menu-toggle.test.ts (56795.137ms)
✔ tests\integration\mute-playback-blocking.test.ts (1375.5546ms)

<--- Last few GCs --->

[12748:000001B490777000]    91770 ms: Scavenge (interleaved) 2022.5 (2031.7) -> 2015.8 (2048.5) MB, pooled: 0 MB, 51.68 / 0.00 ms  (average mu = 0.319, current 
mu = 0.308) allocation failure;
[12748:000001B490777000]    96427 ms: Mark-Compact (reduce) 2037.9 (2055.2) -> 2017.7 (2020.7) MB, pooled: 0 MB, 113.27 / 0.00 ms  (+ 3045.2 ms in 353 steps since start of marking, biggest step 46.0 ms, walltime since start of marking 4170 ms) (average mu
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 00007FF703B4403F node::OnFatalError+1343
 2: 00007FF70478FAA7 v8::Function::NewInstance+423
 3: 00007FF7045904D7 v8::base::AddressSpaceReservation::AddressSpaceReservation+322071
 4: 00007FF7045941E4 v8::base::AddressSpaceReservation::AddressSpaceReservation+337700
 5: 00007FF7045A313C v8::internal::StrongRootAllocatorBase::deallocate_impl+16604
 6: 00007FF7045A297B v8::internal::StrongRootAllocatorBase::deallocate_impl+14619
 7: 00007FF705A2A2AD v8::base::UnsignedDivisionByConstant<unsigned __int64>+2794653
 8: 00007FF70458DFA0 v8::base::AddressSpaceReservation::AddressSpaceReservation+312544
 9: 00007FF7045A87EA X509_STORE_set_cleanup+5098
10: 00007FF7045B4C86 uv_timer_set_repeat+20694
11: 00007FF7041869C7 v8::String::Utf8Value::~Utf8Value+144199
12: 000001B4C87375FA
✖ tests\integration\mute-status-visibility.test.ts (98184.025ms)
✔ tests\integration\piper-english-output.test.ts (3003.4866ms)
✔ tests\integration\piper-model-menu.test.ts (1209.4385ms)
✔ tests\integration\piper-preference-persistence.test.ts (742.5376ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\integration\push_to_talk_flow.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\integration\push_to_talk_flow.test.ts (514.202ms)
✔ tests\integration\spoken-reply-error-handling.test.ts (647.885ms)
✔ tests\integration\spoken-reply-flow.test.ts (844.8246ms)
✔ tests\integration\spoken-reply-recording-mute.test.ts (517.4636ms)
✔ tests\integration\temp-wav-cleanup.test.ts (630.0113ms)
✔ tests\integration\temp-wav-failure-cleanup.test.ts (1928.8551ms)
✔ tests\integration\temp-wav-reuse.test.ts (1005.5776ms)
✔ tests\integration\unified-talk-menu-open.test.ts (475.6513ms)
✔ tests\unit\editor-insert.test.ts (563.5469ms)
✔ tests\unit\f5-shortcut.test.ts (382.3923ms)
✔ tests\unit\footer-status.test.ts (655.7025ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\input\keyboard_listener' imported from C:\Users\caste\repos\talk-pi\tests\unit\keyboard_listener.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/input/keyboard_listener'
}

Node.js v24.15.0
✖ tests\unit\keyboard_listener.test.ts (1407.1743ms)
✔ tests\unit\mute-state.test.ts (864.5959ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder-cleanup.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder-cleanup.test.ts (395.8235ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-recorder' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-recorder.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-recorder'
}

Node.js v24.15.0
✖ tests\unit\offline-recorder.test.ts (416.4892ms)
✔ tests\unit\offline-whisper-safe.test.ts (344.1399ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\voice\offline-whisper' imported from C:\Users\caste\repos\talk-pi\tests\unit\offline-whisper.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/voice/offline-whisper'
}

Node.js v24.15.0
✖ tests\unit\offline-whisper.test.ts (371.5842ms)
✔ tests\unit\piper-client-path.test.ts (1019.3589ms)
✔ tests\unit\piper-client.test.ts (2246.2168ms)
✔ tests\unit\piper-config.test.ts (1227.4228ms)
✔ tests\unit\piper-preferences.test.ts (1163.4744ms)
✔ tests\unit\playback-queue-mute.test.ts (1471.758ms)
✔ tests\unit\playback-queue-stop-idle.test.ts (12269.103ms)
✔ tests\unit\playback-queue-stop.test.ts (4287.4061ms)
✔ tests\unit\playback-queue.test.ts (2917.2603ms)
✔ tests\unit\recording-gate.test.ts (2767.7459ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\recording\recording_controller' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_controller.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/recording/recording_controller'
}

Node.js v24.15.0
✖ tests\unit\recording_controller.test.ts (2042.1485ms)
node:internal/modules/esm/resolve:271
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\caste\repos\talk-pi\src\state\recording_state' imported from C:\Users\caste\repos\talk-pi\tests\unit\recording_state.test.ts
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33)
    at ModuleJob.link (node:internal/modules/esm/module_job:252:17) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///C:/Users/caste/repos/talk-pi/src/state/recording_state'
}

Node.js v24.15.0
✖ tests\unit\recording_state.test.ts (2196.7676ms)
[talk-pi] Shortcut conflict: TALK_PI_SEND_TRANSCRIPT_KEY and TALK_PI_INSERT_TRANSCRIPT_KEY are both "f9". Using defaults.
✔ tests\unit\shortcut-config.test.ts (1799.7929ms)
AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert.ok(statuses.some((value) => value.includes("failed")))

    at run (file:///C:/Users/caste/repos/talk-pi/tests/unit/spoken-reply-failure.test.ts:33:10) {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: false,
  expected: true,
  operator: '==',
  diff: 'simple'
}
✖ tests\unit\spoken-reply-failure.test.ts (510.2915ms)
✔ tests\unit\spoken-reply-status-muted.test.ts (503.7852ms)
✔ tests\unit\spoken-text.test.ts (535.0579ms)
✔ tests\unit\talk-pi-config.test.ts (489.6589ms)
✔ tests\unit\temp-wav-buildup.test.ts (569.2189ms)
✔ tests\unit\temp-wav-cleanup-outcomes.test.ts (642.7806ms)
✔ tests\unit\temp-wav.test.ts (484.6719ms)
✔ tests\unit\unified-talk-menu.test.ts (395.95ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-cleanup.test.ts (388.3587ms)
node:internal/modules/package_json_reader:301
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@earendil-works/pi-tui' imported from C:\Users\caste\repos\talk-pi\src\voice\voice-capture.ts
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:301:9)
    at packageResolve (node:internal/modules/esm/resolve:764:81)
    at moduleResolve (node:internal/modules/esm/resolve:855:18)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at ModuleJob.syncLink (node:internal/modules/esm/module_job:162:33) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v24.15.0
✖ tests\unit\voice-capture-language.test.ts (368.4764ms)
✔ tests\unit\voice-shortcut-interrupt.test.ts (349.0246ms)
ℹ tests 50
ℹ suites 0
ℹ pass 38
ℹ fail 12
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 100371.87

✖ failing tests:

test at tests\integration\mute-menu-toggle.test.ts:1:1
✖ tests\integration\mute-menu-toggle.test.ts (56795.137ms)
  'test failed'

test at tests\integration\mute-status-visibility.test.ts:1:1
✖ tests\integration\mute-status-visibility.test.ts (98184.025ms)
  'test failed'

test at tests\integration\push_to_talk_flow.test.ts:1:1
✖ tests\integration\push_to_talk_flow.test.ts (514.202ms)
  'test failed'

test at tests\unit\keyboard_listener.test.ts:1:1
✖ tests\unit\keyboard_listener.test.ts (1407.1743ms)
  'test failed'

test at tests\unit\offline-recorder-cleanup.test.ts:1:1
✖ tests\unit\offline-recorder-cleanup.test.ts (395.8235ms)
  'test failed'

test at tests\unit\offline-recorder.test.ts:1:1
✖ tests\unit\offline-recorder.test.ts (416.4892ms)
  'test failed'

test at tests\unit\offline-whisper.test.ts:1:1
✖ tests\unit\offline-whisper.test.ts (371.5842ms)
  'test failed'

test at tests\unit\recording_controller.test.ts:1:1
✖ tests\unit\recording_controller.test.ts (2042.1485ms)
  'test failed'

test at tests\unit\recording_state.test.ts:1:1
✖ tests\unit\recording_state.test.ts (2196.7676ms)
  'test failed'

test at tests\unit\spoken-reply-failure.test.ts:1:1
✖ tests\unit\spoken-reply-failure.test.ts (510.2915ms)
  'test failed'

test at tests\unit\voice-capture-cleanup.test.ts:1:1
✖ tests\unit\voice-capture-cleanup.test.ts (388.3587ms)
  'test failed'

test at tests\unit\voice-capture-language.test.ts:1:1
✖ tests\unit\voice-capture-language.test.ts (368.4764ms)
  'test failed'