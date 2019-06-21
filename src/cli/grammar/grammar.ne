main -> statement {% id %}

LB -> "("
RB -> ")"

_ -> null | _ [\s] {% function() {} %}

statement -> contractFunc {% id %}

identifier -> [a-z | A-Z] [a-z | A-Z | 0-9 | _]:* {% function(d) { return d[0] + d[1].join(""); }  %}
            | "_" [ a-z | A-Z | 0-9 | _]:+ {% function(d) { return d[0] + d[1].join(""); }  %}

posint -> [0-9] {% id %}
        | posint [0-9] {% function(d) { return d[0] + d[1]; } %} 

int -> "-" posint {% function(d) { return d[0] + d[1]; } %}
     | posint {% id %}

float -> int {% id %}
      |  int "." posint {% function(d) {return d[0] + d[1] + d[2]; } %}

string -> "\"" _string "\"" {% function(d) {return d[1]; } %}

_string ->
	null {% function() {return ""; } %}
	| _string _stringchar {% function(d) {return d[0] + d[1];} %}

_stringchar ->
	[^\\"] {% id %}
	| "\\" [^] {% function(d) {return JSON.parse("\"" + d[0] + d[1] + "\""); } %}

_ -> null | _ [\s] {% function() {} %}
__ -> [\s] | __ [\s] {% function() {} %}

arg -> "true"  {% function(d) { return true; } %}
     | "false" {% function(d) { return false; } %}
     | int  {% function(d) { return Number(d[0]); } %}
     | float {% function(d) { return Number(d[0]); } %}
     | string {% id %}

argList -> _ arg _ {% function(d) { return [d[1]]; } %}
         | argList _ "," _ arg {% function(d) {  return d[0].concat(d[4]); } %}

args -> LB RB {% function(d) { return []; } %}
      | LB argList RB {% function(d) { return d[1]; } %}

contractFunc -> identifier args {% function(d) { return { name: d[0], args: d[1] }; } %}
