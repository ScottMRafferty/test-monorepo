#include <emscripten/emscripten.h>
#include <string>

extern "C" {
    // KEEPALIVE ensures the compiler doesn't remove the function as "unused"
    EMSCRIPTEN_KEEPALIVE
    const char* get_json_response() {
        // We use a static string so the memory persists after the function returns
        static std::string response = "{\"message\": \"Response from WASM C API test!\", \"status\": \"success\"}";
        return response.c_str();
    }
}