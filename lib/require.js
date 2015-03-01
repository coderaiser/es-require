/*jshint -W079*/
var require;
/*jshint +W079 */

(function() {
    'use strict';
    
    var Modules = {},
        Dir     = '';
    
    /*global File */
    
    /*jshint -W020 */
    require = function(name) {
        var code, exports,
            file        = openFile(Dir + name),
            filename    = file.fullName,
            dirname     = getDir(filename);
            
        if (Modules[filename]) {
            exports         = Modules[filename];
        } else {
            code            = readFile(file, function(error, code) {
                var fn;
                
                if (error) {
                    throwError(error, file.name);
                } else {
                    error = tryCatch(function() {
                        var args = [
                            'exports',
                            'require',
                            'module',
                            '__filename',
                            '__dirname'];
                        
                        fn = Function(args, code);
                        
                        fn(exports, require, {exports: exports}, filename, dirname);
                    });
                    
                    if (error) {
                        if (/.js$/.test(error.message))
                            name = '';
                        else
                            name = file.name;
                        
                        throwError(error.message, name);
                    }
                    
                    Modules[filename]   = exports;
                }
            });
        }
        
        return exports;
    };
    /*jshint +W020 */
    
    require.dir = function(dir) {
        Dir = dir;
    };
    
    function getDir(path) {
        var index   = path.lastIndexOf('/'),
            dir     = path.slice(0, index) || '/';
        
        return dir;
    }
    
    function openFile(name) {
        var file    = tryOpen(name, ['.js', '.jsx']);
        return file;
    }
    
    function readFile(file, callback) {
        var data = file.read(data);
        
        if (!file.error)
            file.close();
        
        callback(file.error, data, file);
    }
    
    function tryOpen(name, exts) {
        var file;
        
        some(exts, function(ext) {
            var is;
            
            file    = new File(name + ext);
            
            file.encoding = 'UTF-8';
            
            is      = file.open('r:');
            
            return is;
        });
        
        if (file.error) {
            throwError(file.error, file.name);
        }
        
        return file;
    }
    
    function throwError(error, fileName) {
        if (fileName)
            fileName = ' in ' + fileName;
        
        throw Error(error + fileName);
    }
    
    function tryCatch(fn) {
        var error;
        
        try {
            fn();
        } catch(err) {
            error = err;
        }
        
        return error;
    }
    
    function some(array, fn) {
        var i, is,
            n = array.length;
        
        for (i = 0; i < n; i++) {
            is = fn(array[i], i, n);
            
            if (is)
                break;
        }
    }
    
})();
