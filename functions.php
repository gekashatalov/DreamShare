<?php

    $links = mysqli_connect('localhost', 'root', '', 'new_test');

    if(mysqli_connect_errno()){
        echo 'Ошибка подключения к базе данных('.mysqli_connect_errno(). ') : '.mysqli_connect_error();
        exit();
    }

    define('THEME_FOLDER', get_template_directory_uri());
    define('CSS_FOLDER', THEME_FOLDER . '/css');
    define('IMG_FOLDER', THEME_FOLDER . '/IMG');

    
    add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );
        function theme_name_scripts() {
            wp_enqueue_style( 'styles', CSS_FOLDER . '/styles.css' );
            wp_enqueue_style( 'theme', get_stylesheet_uri() );
            wp_enqueue_script( 'script-name', get_template_directory_uri() . '/js/example.js', array(), '1.0.0', true );
        };