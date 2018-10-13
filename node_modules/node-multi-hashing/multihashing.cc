#include <node.h>
#include <node_buffer.h>
#include <v8.h>
#include <stdint.h>
#include <nan.h>

extern "C" {
    #include "PoW.h"
}


#define THROW_ERROR_EXCEPTION(x) Nan::ThrowError(x)

using namespace node;
using namespace v8;


NAN_METHOD(cryptohello) {
    if (info.Length() < 1)
        return THROW_ERROR_EXCEPTION("You must provide one argument.");

    if (info.Length() >= 2) {
        if(!info[1]->IsBoolean())
            return THROW_ERROR_EXCEPTION("Argument 2 should be a boolean");
    }

    Local<Object> target = info[0]->ToObject();

    if(!Buffer::HasInstance(target))
        return THROW_ERROR_EXCEPTION("Argument should be a buffer object.");

    uint8_t * input = (uint8_t *)Buffer::Data(target);
    uint8_t output[OUTPUT_LEN];

    uint32_t input_len = Buffer::Length(target);
    //input_len=input_len;
    
    helloHash(input, input_len, output);

    v8::Local<v8::Value> returnValue = Nan::CopyBuffer((char *)output, OUTPUT_LEN).ToLocalChecked();
	
    info.GetReturnValue().Set(returnValue);
}


NAN_MODULE_INIT(init) {
    Nan::Set(target, Nan::New("cryptohello").ToLocalChecked(), Nan::GetFunction(Nan::New<FunctionTemplate>(cryptohello)).ToLocalChecked());
}

NODE_MODULE(multihashing, init)
