var __extends = this && this.__extends || function(b, a) {
  function c() {
    this.constructor = b;
  }
  for (var d in a) {
    a.hasOwnProperty(d) && (b[d] = a[d]);
  }
  c.prototype = a.prototype;
  b.prototype = new c;
};
require("es6-shim");
function asEnumerable(b) {
  void 0 === b && (b = null);
  return new Linq(b);
}
exports.asEnumerable = asEnumerable;
function Range(b, a) {
  return new Linq(null, function() {
    return new GeneratorIterator(b, a, !0);
  });
}
exports.Range = Range;
function Repeat(b, a) {
  return new Linq(null, function() {
    return new GeneratorIterator(b, a);
  });
}
exports.Repeat = Repeat;
var Linq = function() {
  function b(a, c, d) {
    this._target = a;
    this._factory = c;
    this._factoryArg = d;
  }
  b.prototype[Symbol.iterator] = function() {
    return null != this._factory ? this._factory(this._factoryArg) : null != this._target ? this._target[Symbol.iterator]() : {next:function() {
      return {done:!0, value:void 0};
    }};
  };
  b.prototype.GetEnumerator = function() {
    return new Enumerator(this[Symbol.iterator]());
  };
  b.prototype.Aggregate = function(a, c, d) {
    void 0 === d && (d = selfFn);
    for (var b, f = this[Symbol.iterator]();!(b = f.next()).done;) {
      a = c(a, b.value);
    }
    return d(a);
  };
  b.prototype.All = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, d = this[Symbol.iterator]();!(c = d.next()).done;) {
      if (!a(c.value)) {
        return !1;
      }
    }
    return !0;
  };
  b.prototype.Any = function(a) {
    var c, d = this[Symbol.iterator]();
    if (null == a) {
      return !d.next().done;
    }
    for (;!(c = d.next()).done;) {
      if (a(c.value)) {
        return !0;
      }
    }
    return !1;
  };
  b.prototype.Average = function(a) {
    for (var c = 0, d = 0, b = this[Symbol.iterator]();!(a = b.next()).done;) {
      c += a.value, d++;
    }
    return c / d;
  };
  b.prototype.Contains = function(a, c) {
    void 0 === c && (c = function(a, c) {
      return a === c;
    });
    for (var d, b = this[Symbol.iterator]();!(d = b.next()).done;) {
      if (c(a, d.value)) {
        return !0;
      }
    }
    return !1;
  };
  b.prototype.Count = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, d = 0, b = this[Symbol.iterator]();!(c = b.next()).done;) {
      a(c.value) && d++;
    }
    return d;
  };
  b.prototype.Max = function(a) {
    void 0 === a && (a = selfFn);
    for (var c, d, b = !1, f = this[Symbol.iterator]();!(c = f.next()).done;) {
      c = a(c.value), b ? d < c && (d = c) : (d = c, b = !0);
    }
    if (!b) {
      throw noElements;
    }
    return d;
  };
  b.prototype.Min = function(a) {
    void 0 === a && (a = selfFn);
    for (var c, d, b = !1, f = this[Symbol.iterator]();!(c = f.next()).done;) {
      c = a(c.value), b ? d > c && (d = c) : (d = c, b = !0);
    }
    if (!b) {
      throw noElements;
    }
    return d;
  };
  b.prototype.ElementAt = function(a) {
    for (var c, d = 0, b = this[Symbol.iterator]();!(c = b.next()).done;) {
      if (a === d++) {
        return c.value;
      }
    }
    throw "Argument Out Of Range";
  };
  b.prototype.ElementAtOrDefault = function(a) {
    for (var c, b, e = 0, f = this[Symbol.iterator]();!(c = f.next()).done;) {
      if (a === e++) {
        return c.value;
      }
      b = c.value;
    }
    return getDefaultVal(typeof b);
  };
  b.prototype.First = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b = this[Symbol.iterator]();!(c = b.next()).done;) {
      if (a(c.value)) {
        return c.value;
      }
    }
    throw nothingFound;
  };
  b.prototype.FirstOrDefault = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b, e = this[Symbol.iterator]();!(c = e.next()).done;) {
      if (b = c.value, a(b)) {
        return c.value;
      }
    }
    return getDefaultVal(typeof b);
  };
  b.prototype.Last = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b, e = !1, f = this[Symbol.iterator]();!(c = f.next()).done;) {
      a(c.value) && (b = c.value, e = !0);
    }
    if (!e) {
      throw nothingFound;
    }
    return b;
  };
  b.prototype.LastOrDefault = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b, e, f = !1, g = this[Symbol.iterator]();!(c = g.next()).done;) {
      a(c.value) && (b = c.value, f = !0), e = c.value;
    }
    return f ? b : getDefaultVal(typeof e);
  };
  b.prototype.SequenceEqual = function(a, c) {
    void 0 === c && (c = function(a, c) {
      return a === c;
    });
    var b, e, f = this[Symbol.iterator](), g = a[Symbol.iterator]();
    do {
      if (b = f.next(), e = g.next(), b.done != e.done || !c(b.value, e.value)) {
        return !1;
      }
    } while (!b.done && !e.done);
    return !0;
  };
  b.prototype.Single = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b = !1, e, f = this[Symbol.iterator]();!(e = f.next()).done;) {
      if (a(e.value)) {
        if (b) {
          throw tooMany;
        }
        c = e.value;
        b = !0;
      }
    }
    if (b) {
      return c;
    }
    throw nothingFound;
  };
  b.prototype.SingleOrDefault = function(a) {
    void 0 === a && (a = trueFn);
    for (var c, b, e = !1, f, g = this[Symbol.iterator]();!(f = g.next()).done;) {
      if (a(f.value)) {
        if (e) {
          throw tooMany;
        }
        c = f.value;
        e = !0;
      }
      b = f.value;
    }
    return e ? c : getDefaultVal(typeof b);
  };
  b.prototype.Sum = function(a) {
    for (var c = 0, b = this[Symbol.iterator]();!(a = b.next()).done;) {
      c += a.value;
    }
    return c;
  };
  b.prototype.ToArray = function() {
    for (var a, c = [], b = this[Symbol.iterator]();!(a = b.next()).done;) {
      c.push(a.value);
    }
    return c;
  };
  b.prototype.ToMap = function(a, c) {
    void 0 === c && (c = selfFn);
    for (var b = new Map, e, f = this[Symbol.iterator]();!(e = f.next()).done;) {
      b.set(a(e.value), c(e.value));
    }
    return b;
  };
  b.prototype.ToDictionary = function(a, c) {
    void 0 === c && (c = selfFn);
    for (var b = new Map, e, f = this[Symbol.iterator]();!(e = f.next()).done;) {
      b.set(a(e.value), c(e.value));
    }
    return b;
  };
  b.prototype.DefaultIfEmpty = function(a) {
    var c = this;
    void 0 === a && (a = void 0);
    return new b(this, function() {
      return new DefaultIfEmptyIteratror(c._target[Symbol.iterator](), a);
    });
  };
  b.prototype.Cast = function() {
    var a = this;
    return new b(this, function() {
      return new SelectIteratror(a._target[Symbol.iterator](), function(a) {
        return a;
      });
    });
  };
  b.prototype.Concat = function(a) {
    var c = [this._target, a];
    return new b(this, function() {
      return new SelectManyIteratror(c[Symbol.iterator](), selfFn, selfFn);
    });
  };
  b.prototype.Distinct = function() {
    var a = this;
    return new b(this, function() {
      return new DistinctIteratror(a._target[Symbol.iterator]());
    });
  };
  b.prototype.Except = function(a) {
    for (var c = this, d = new Set, e = a[Symbol.iterator]();!(a = e.next()).done;) {
      d.add(a.value);
    }
    return new b(this, function() {
      return new IntersectIteratror(c._target[Symbol.iterator](), d, !0);
    });
  };
  b.prototype.GroupBy = function(a, c, d) {
    void 0 === d && (d = defGrouping);
    for (var e, f = this[Symbol.iterator](), g = new Map;!(e = f.next()).done;) {
      var h = a(e.value), k = g.get(h);
      "undefined" === typeof k && (k = [], g.set(h, k));
      k.push(c(e.value));
    }
    new GroupByIteratror(g.keys(), d, g);
    return new b(this, function() {
      return new GroupByIteratror(g.keys(), d, g);
    });
  };
  b.prototype.GroupJoin = function(a, c, d, e) {
    var f = this;
    void 0 === e && (e = defGrouping);
    var g = new Map;
    a = a[Symbol.iterator]();
    for (var h;!(h = a.next()).done;) {
      var k = d(h.value);
      if ("undefined" === typeof k) {
        throw "Inner Key selector returned undefined Key";
      }
      var l = g.get(k);
      "undefined" === typeof l && (l = [], g.set(k, l));
      l.push(h.value);
    }
    return new b(this, function() {
      return new GroupJoinIteratror(f._target[Symbol.iterator](), c, e, g);
    });
  };
  b.prototype.Intersect = function(a) {
    for (var c = this, d = new Set, e = a[Symbol.iterator]();!(a = e.next()).done;) {
      d.add(a.value);
    }
    return new b(this, function() {
      return new IntersectIteratror(c._target[Symbol.iterator](), d);
    });
  };
  b.prototype.Join = function(a, c, d, e) {
    var f = this;
    return new b(this, function() {
      return new JoinIteratror(f._target[Symbol.iterator](), a[Symbol.iterator](), c, d, e);
    });
  };
  b.prototype.OrderBy = function(a, c) {
    void 0 === a && (a = selfFn);
    void 0 === c && (c = function(a, c) {
      return a - c;
    });
    return new OrderedLinq(this, function(a) {
      return new ArrayIterator(a, 0, function(c) {
        return c >= a.length;
      });
    }, function(b, e) {
      return c(a(b), a(e));
    });
  };
  b.prototype.OrderByDescending = function(a, c) {
    void 0 === a && (a = selfFn);
    void 0 === c && (c = function(a, c) {
      return a - c;
    });
    return new OrderedLinq(this, function(a) {
      return new ArrayIterator(a, a.length - 1, function(a) {
        return 0 > a;
      }, -1);
    }, function(b, e) {
      return c(a(b), a(e));
    });
  };
  b.prototype.ThenBy = function(a, c) {
    void 0 === a && (a = selfFn);
    void 0 === c && (c = function(a, c) {
      return a - c;
    });
    if (this instanceof OrderedLinq) {
      var b = this.equal;
      this.equal = function(e, f) {
        var g = b(e, f);
        return 0 != g ? g : c(a(e), a(f));
      };
      return this;
    }
    return new OrderedLinq(this, function(a) {
      return new ArrayIterator(a, 0, function(c) {
        return c >= a.length;
      });
    }, function(b, d) {
      return c(a(b), a(d));
    });
  };
  b.prototype.ThenByDescending = function(a, c) {
    void 0 === a && (a = selfFn);
    void 0 === c && (c = function(a, c) {
      return a - c;
    });
    if (this instanceof OrderedLinq) {
      var b = this.equal;
      this.equal = function(e, f) {
        var g = b(e, f);
        return 0 != g ? g : c(a(e), a(f));
      };
      return this;
    }
    return new OrderedLinq(this, function(a) {
      return new ArrayIterator(a, a.length - 1, function(a) {
        return 0 > a;
      }, -1);
    }, function(b, d) {
      return c(a(b), a(d));
    });
  };
  b.prototype.Range = function(a, c) {
    return new b(null, function() {
      return new GeneratorIterator(a, c, !0);
    });
  };
  b.prototype.Repeat = function(a, c) {
    return new b(null, function() {
      return new GeneratorIterator(a, c);
    });
  };
  b.prototype.Reverse = function() {
    var a = Array.isArray(this._target) ? this._target : this.ToArray();
    return new b(null, function() {
      return new ArrayIterator(a, a.length - 1, function(a) {
        return 0 > a;
      }, -1);
    });
  };
  b.prototype.Select = function(a) {
    var c = this;
    return new b(this, function() {
      return new SelectIteratror(c._target[Symbol.iterator](), a);
    });
  };
  b.prototype.SelectMany = function(a, c) {
    var d = this;
    void 0 === a && (a = selfFn);
    void 0 === c && (c = selfFn);
    return new b(this, function() {
      return new SelectManyIteratror(d._target[Symbol.iterator](), a, c);
    });
  };
  b.prototype.Skip = function(a) {
    for (var c = this._target[Symbol.iterator](), d = 0;d < a;d++) {
      c.next();
    }
    return new b(this, function() {
      return new WhereIteratror(c, trueFn);
    });
  };
  b.prototype.SkipWhile = function(a) {
    var c = this;
    void 0 === a && (a = function(a, c) {
      return !1;
    });
    return new b(this, function() {
      return new SkipIterator(c._target[Symbol.iterator](), a);
    });
  };
  b.prototype.Take = function(a) {
    var c = this;
    return new b(this, function() {
      return new TakeIterator(c._target[Symbol.iterator](), function(c, b) {
        return a > b;
      });
    });
  };
  b.prototype.TakeWhile = function(a) {
    var c = this;
    return new b(this, function() {
      return new TakeIterator(c._target[Symbol.iterator](), a);
    });
  };
  b.prototype.Union = function(a) {
    var c = [this._target, a];
    return new b(this, function() {
      return new UnionIteratror(c[Symbol.iterator]());
    });
  };
  b.prototype.Where = function(a) {
    var c = this;
    void 0 === a && (a = trueFn);
    return new b(this, function() {
      return new WhereIteratror(c._target[Symbol.iterator](), a);
    });
  };
  b.prototype.Zip = function(a, c) {
    var d = this;
    return new b(this, function() {
      return new ZipIteratror(d._target[Symbol.iterator](), a[Symbol.iterator](), c);
    });
  };
  return b;
}(), OrderedLinq = function(b) {
  function a(a, d, e) {
    b.call(this, a, d);
    this.equal = e;
  }
  __extends(a, b);
  a.prototype[Symbol.iterator] = function() {
    "undefined" === typeof this._factoryArg && (this._factoryArg = this._target.ToArray(), this._factoryArg.sort(this.equal));
    return this._factory(this._factoryArg);
  };
  return a;
}(Linq), Enumerator = function() {
  function b(a) {
    this._iterator = a;
  }
  Object.defineProperty(b.prototype, "Current", {get:function() {
    return this._result.value;
  }, enumerable:!0, configurable:!0});
  b.prototype.MoveNext = function() {
    this._result = this._iterator.next();
    return !this._result.done;
  };
  b.prototype.Reset = function() {
    throw "JavaScript iterators could not be Reset";
  };
  return b;
}(), ArrayIterator = function() {
  function b(a, c, b, e) {
    void 0 === e && (e = 1);
    this._source = a;
    this._current = c;
    this._done = b;
    this._increment = e;
  }
  b.prototype.next = function(a) {
    a = {value:this._source[this._current], done:this._done(this._current)};
    this._current += this._increment;
    return a;
  };
  return b;
}(), IteratorBase = function() {
  return function(b) {
    this._iterator = b;
    this._done = {value:void 0, done:!0};
  };
}(), DistinctIteratror = function(b) {
  function a() {
    b.apply(this, arguments);
    this._set = new Set;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    for (var b;!(b = this._iterator.next()).done && this._set.has(b.value);) {
    }
    this._set.add(b.value);
    return b;
  };
  return a;
}(IteratorBase), IntersectIteratror = function(b) {
  function a(a, d, e) {
    void 0 === e && (e = !1);
    b.call(this, a);
    this._set = d;
    this._switch = e;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    for (var b;!(b = this._iterator.next()).done && this._switch == this._set.has(b.value);) {
    }
    this._switch || this._set.add(b.value);
    return b;
  };
  return a;
}(IteratorBase), GeneratorIterator = function(b) {
  function a(a, d, e) {
    void 0 === e && (e = !1);
    b.call(this, null);
    this._current = a;
    this._count = d;
    this._increment = e;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    a = 0 < this._count ? {value:this._current, done:0 >= this._count--} : this._done;
    this._increment && this._current++;
    return a;
  };
  return a;
}(IteratorBase), DefaultIfEmptyIteratror = function(b) {
  function a(a, d) {
    b.call(this, a);
    this._default = d;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    return this.check(this._iterator.next());
  };
  a.prototype.check = function(a) {
    a.done ? a.value = this._default : this.check = function(a) {
      return a;
    };
    return a;
  };
  return a;
}(IteratorBase), MethodIteratror = function(b) {
  function a(a, d, e) {
    void 0 === d && (d = null);
    void 0 === e && (e = 0);
    b.call(this, a);
    this._method = d;
    this._index = e;
  }
  __extends(a, b);
  return a;
}(IteratorBase), WhereIteratror = function(b) {
  function a() {
    b.apply(this, arguments);
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    do {
      a = this._iterator.next();
    } while (!a.done && !this._method(a.value, this._index++));
    return a;
  };
  return a;
}(MethodIteratror), SkipIterator = function(b) {
  function a() {
    b.apply(this, arguments);
    this._hasSkipped = !1;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    var b;
    if (this._hasSkipped) {
      return this._iterator.next();
    }
    for (;!(b = this._iterator.next()).done && this._method(b.value, this._index++);) {
    }
    this._hasSkipped = !0;
    return b;
  };
  return a;
}(MethodIteratror), TakeIterator = function(b) {
  function a() {
    b.apply(this, arguments);
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    a = this._iterator.next();
    return a.done || !this._method(a.value, this._index++) ? this._done : a;
  };
  return a;
}(MethodIteratror), ZipIteratror = function(b) {
  function a(a, d, e) {
    b.call(this, a, e);
    this._second = d;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    a = this._iterator.next();
    var b = this._second.next();
    return a.done || b.done ? this._done : {done:!1, value:this._method(a.value, b.value)};
  };
  return a;
}(MethodIteratror), SelectIteratror = function(b) {
  function a() {
    b.apply(this, arguments);
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    a = this._iterator.next();
    if (a.done) {
      return a;
    }
    a.value = this._method(a.value, this._index++);
    return a;
  };
  return a;
}(MethodIteratror), SelectManyIteratror = function(b) {
  function a(a, d, e) {
    void 0 === e && (e = selfFn);
    b.call(this, a, d);
    this._resultState = this._collectionState = this._done;
    this._resultSelector = e;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    do {
      if (this._resultState.done) {
        this._collectionState = this._iterator.next();
        if (this._collectionState.done) {
          return this._done;
        }
        this._collection = this._method(this._collectionState.value)[Symbol.iterator]();
      }
      this._resultState = this._collection.next();
      this._resultState.done || (this._resultState.value = this._resultSelector(this._resultState.value));
    } while (this._resultState.done);
    return this._resultState;
  };
  return a;
}(MethodIteratror), JoinIteratror = function(b) {
  function a(a, d, e, f, g) {
    b.call(this, a, null);
    this._method = e;
    for (this._map = new Map;!(a = d.next()).done;) {
      e = f(a.value);
      var h = this._map.get(e);
      "undefined" === typeof h && (h = [], this._map.set(e, h));
      h.push(a.value);
    }
    this._resultSelector = g;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    do {
      if (this._resultState.done) {
        this._collectionState = this._iterator.next();
        if (this._collectionState.done) {
          return this._done;
        }
        a = this._method(this._collectionState.value);
        a = this._map.get(a);
        if ("undefined" === typeof a) {
          continue;
        }
        this._collection = a[Symbol.iterator]();
      }
      this._resultState = this._collection.next();
      this._resultState.done || (this._resultState.value = this._resultSelector(this._collectionState.value, this._resultState.value));
    } while (this._resultState.done);
    return this._resultState;
  };
  return a;
}(SelectManyIteratror), UnionIteratror = function(b) {
  function a(a) {
    b.call(this, a, selfFn);
    this._set = new Set;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    for (var d;!(d = b.prototype.next.call(this)).done && this._set.has(d.value);) {
    }
    this._set.add(d.value);
    return d;
  };
  return a;
}(SelectManyIteratror), GroupByIteratror = function(b) {
  function a(a, d, e) {
    b.call(this, a, d);
    this._map = e;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    a = this._iterator.next();
    if (a.done) {
      return this._done;
    }
    var b = this._map.get(a.value);
    return {value:this._method(a.value, b), done:!1};
  };
  return a;
}(MethodIteratror), GroupJoinIteratror = function(b) {
  function a(a, d, e, f) {
    b.call(this, a, d);
    this._transform = e;
    this._map = f;
  }
  __extends(a, b);
  a.prototype.next = function(a) {
    var b;
    do {
      a = this._iterator.next();
      if (a.done) {
        return this._done;
      }
      b = this._method(a.value);
      b = this._map.get(b);
    } while ("undefined" === typeof b);
    return {value:this._transform(a.value, b), done:!1};
  };
  return a;
}(MethodIteratror), trueFn = function() {
  return !0;
}, selfFn = function(b) {
  return b;
}, defGrouping = function(b, a) {
  if ("undefined" != typeof a.key) {
    throw "Object already has property [key]";
  }
  a.key = b;
  return a;
};
function getDefaultVal(b) {
  if ("string" !== typeof b) {
    throw new TypeError("Type must be a string.");
  }
  switch(b) {
    case "boolean":
      return !1;
    case "function":
      return function() {
      };
    case "null":
      return null;
    case "number":
      return 0;
    case "object":
      return {};
    case "string":
      return "";
    case "symbol":
      return Symbol();
    case "undefined":
      return;
  }
  try {
    return new ("function" === typeof this[b] ? this[b] : eval(b));
  } catch (a) {
    return {};
  }
}
var nothingFound = "No element satisfies the condition in predicate", noElements = "The source sequence is empty.", tooMany = "More than one element satisfies the condition in predicate.";