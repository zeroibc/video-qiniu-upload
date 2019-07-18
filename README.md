laravel-admin extension
======

本扩展包是针对[laravel-admin](https://github.com/z-song/laravel-admin)开发的大文件直接上传到七牛的工具，
直接用于Form组件。当前版本为Laravel 5.5。

1,安装：
````
composer require zeroibc/large-file-upload
````
2,发布本扩展包的静态资源：
````
php artisan vendor:publish --tag=large-file-upload
````
3,注册进laravel-admin,在app/Admin/bootstrap.php中添加以下代码：
````
Encore\Admin\Form::extend('largefile', \Zero\LargeFileUpload\LargeFileField::class);
````
6,在控制器中直接调用就可以了：
````
$form->largefile('ColumnName', 'LabelName');
````
