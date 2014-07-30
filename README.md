[![Bancha logo](http://docs.banchaproject.com/wiki/images/github-logo.png)](http://banchaproject.com)

Bancha Sample Project
=============================

This is the development playground for Bancha developers, providing sample of how to use Bancha.

[Live demo](http://samples.banchaproject.com)


How to setup the project
------------------------

__CakePHP Setup:__

1. Download [CakePHP](http://www.cakephp.org) latest (tested with 2.0.6, 2.1.5, 2.2.0, 2.2.8, 2.3.0, 2.3.8, 2.4.0, 2.4.1)
1. Delete the app folder
1. Open the terminal inside the cake folder and type: git clone --recursive https://github.com/Bancha/BanchaTestProject.git app (alternativly download this project inside __/app__)
1. Configure your _app/Config/database.php_, then go in your console inside _app/_ and execute _"./Console/cake" schema create_ to create all the tables. You may also want to use the example data in _app/Config/Schema/testdata.sql_ (you probably will need to change the table prefix in this file).
1. Open __/bancha/setup-check.html__ to see if everything works.

__For Ext JS Support:__

1. Download [Ext JS](http://www.sencha.com/products/extjs/download/).
1. Place _ext-all.js_ and _ext-all-dev.js_ inside _app/webroot/js/_ and the Ext JS ressources folder into _app/webroot/css/_
1. If your application is not running in the domain root, please adopt the path in _Ext.Loader.setPath('Bancha','/Bancha/js');_ in all _app/webroot/js_ files to match _your-path-to-cakephp-root/Bancha/js_
1. Open one of the various examples (placed in _app/webroot/_), e.g. localhost/crud-samples.html

__For Sencha Touch Support:__

1. Download [Sencha Touch 2](http://www.sencha.com/products/touch/download/).
1. Place _sencha-touch-all-debug.js_ and the _resources_ folder inside _app/webroot/js/touch/sencha-touch/_
1. If your application is not running in the domain root, please adopt the path in _Ext.Loader.setPath('Bancha','/Bancha/js');_ in _app/webroot/touch/app.js:17_ to match _your-path-to-cakephp-root/Bancha/js_
1. Open the WebApp in your browser, localhost/touch/



That's it, enjoy!



More information
----------------

*   [Bancha Overview](http://bancha.io/)
*   [Updates on Twitter](http://twitter.com/#!/banchaproject)

-------------------------

_This package is not for production use. It includes multiple licences, 
everything works under GNU General Public License version 3 as far as we 
know, but there is no warranty._

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
