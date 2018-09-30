---
title: failed to resolve: com
tags： Android Gradle
---
# Gradle 错误：failed to resolve: com
gradle文件内容：
```gradle
apply plugin: "com.android.application"

android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "work.mathwiki"
        minSdkVersion 21
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            pseudoLocalesEnabled true
        }
        debug {
            debuggable true
            jniDebuggable true
            renderscriptDebuggable true
        }
    }
    buildToolsVersion '27.0.3'
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    lintOptions {
        disable 'RtlHardcoded', 'ContentDescription'
    }
}

dependencies {
    implementation fileTree(include: ["*.jar"], dir: "libs")

    implementation "com.android.support:appcompat-v7:26.1.0"

    implementation "com.android.support:design:26.1.0"

    implementation "com.android.support.constraint:constraint-layout:1.1.2"

    implementation "com.android.support:support-v4:26.1.0"

    implementation "com.android.support:recyclerview-v7:26.1.0"

    implementation "com.alibaba:fastjson:1.1.70.android"

    implementation "com.squareup.retrofit2:retrofit:2.4.0"

    implementation "com.github.manuelpeinado.fadingactionbar:fadingactionbar-abc:3.1.2"

    implementation 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
    testImplementation "junit:junit:4.12"

    androidTestImplementation "com.android.support.test:runner:1.0.2"

    androidTestImplementation "com.android.support.test.espresso:espresso-core:3.0.2"

    androidTestImplementation "com.android.support:support-annotations:26.1.0"
}
```
#### 尝试修复
    1. 用双引号"代替单引号'
        结果上一个问题解决了，但是后面出现了新的问题，错误码同样是`failed to resolve: com`  
        无效 X
    2. 用双引号"代替单引号'，行后面

#### 解决方法
    检查了一遍依赖，发现里面有一个地方
    ```
    implementation 'com.jakewharton:butterknife:(insert latest version)'
annotationProcessor 'com.jakewharton:butterknife-compiler:(insert latest version)'
```
这里没有进行替换，奇怪的是gradle竟然不是报library错误，failed to resolve : com 岂是我等凡人能够读懂的。。。
虽然的确是自己的疏忽，不过这个可能也是一个隐秘的bug，报错信息不明确，白白耽误了很多时间。


